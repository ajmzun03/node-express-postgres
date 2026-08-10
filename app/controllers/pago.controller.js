// app/controllers/pago.controller.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Crea una sesión de pago (Stripe Checkout) para un monto/producto dado
exports.crearSesion = async (req, res) => {
  try {
    const { nombreProducto, precioEnCentavos, cantidad } = req.body;

    if (!nombreProducto || !precioEnCentavos) {
      return res.status(400).send({ message: "nombreProducto y precioEnCentavos son requeridos." });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: nombreProducto },
            unit_amount: precioEnCentavos
          },
          quantity: cantidad || 1
        }
      ],
      mode: "payment",
      // URLs dinámicas usando la variable de entorno
      success_url: `${process.env.BASE_URL}/pago-exitoso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/pago-cancelado`
    });

    res.status(200).send({ id: session.id, url: session.url });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al crear la sesión de pago." });
  }
};

// Este endpoint lo llama Stripe directamente (no tu frontend)
exports.webhook = (req, res) => {
  const sig = req.headers["stripe-signature"];
  let evento;

  try {
    evento = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (evento.type) {
    case "checkout.session.completed":
      const session = evento.data.object;
      console.log("Pago confirmado para la sesión:", session.id);
      break;
    default:
      console.log(`Evento de Stripe no manejado: ${evento.type}`);
  }

  res.status(200).send({ received: true });
};