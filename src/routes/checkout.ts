import { Request, Response, Router } from 'express';
import { addToCart, getIssuesInCart, processPayment, removeFromCart } from '../controller/paymentController';

const purchaseRoutes = Router();

purchaseRoutes.post('/checkout', async (req: Request, res: Response) => {
  const { payment_method_id, price, user_email, customer_id } = req.body;

  try {
    const payment = await processPayment(payment_method_id, price, user_email, customer_id);
    res.status(200).send({ msg: 'Payment successful!', payment });
  } catch (error: any) {
    console.error('Payment error: ', error);
    res.status(500).json({ error: error.message || 'There was an error processing the payment.' });
  };
});

purchaseRoutes.post('/:user_id/cart', async (req: Request, res: Response) => {
  const { issue_data } = req.body;
  const { user_id } = req.params;

  try {
    const newPurchase = await addToCart(issue_data, user_id)
    res.status(200).send(newPurchase);
  } catch (error: any) {
    console.error('Error adding to cart: ', error);
    res.status(500).json({ error: error.message || 'There was an error adding to cart.' });
  };
});

purchaseRoutes.delete('/:user_id/cart', async (req: Request, res: Response) => {
  const { issue_data } = req.body;
  const { user_id } = req.params;

  try {
    const removed = await removeFromCart(issue_data, user_id);

    if (removed) {
      res.status(200).send({ msg: 'Removed from cart successfully.' });
    } else {
      res.status(404).send({ msg: 'Purchase or issue not found.' });
    };
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  };
});

purchaseRoutes.get('/:user_id/cart', async (req: Request, res: Response) => {
  const { user_id } = req.params;

  try {
    const issuesInCart = await getIssuesInCart(user_id);
    res.status(200).json(issuesInCart);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  };
});

export default purchaseRoutes;