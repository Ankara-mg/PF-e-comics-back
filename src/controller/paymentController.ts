import Stripe from 'stripe';
import { IssueAttributes } from '@custom-types/issues';
import db from '../../models';

const stripe = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion: '2025-07-30.basil',
});

const processPayment = async (payment_method_id: string, price: number, user_email: string, customer_id: string) => {
  const amount: number = Math.round(price * 100);
  try {
    const payment: Stripe.PaymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'comic',
      payment_method: payment_method_id,
      confirm: true,
      receipt_email: user_email,
      customer: customer_id,
    });

    return payment;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  };
};

const addToCart = async (comic_issue: IssueAttributes, user_id: string) => {
  try {
    const issueDb = await db.Issue.findOne({ where: { id: comic_issue.id } });
    const userDb = await db.User.findOne({ where: { id: user_id } });

    if (!issueDb) throw 'Issue not found.';
    if (!userDb) throw 'User not found.';

    const newPurchase = await db.Purchase.create({
      total_price: comic_issue.price,
      status: 'In Cart',
    });

    await newPurchase.addIssues(issueDb);
    await newPurchase.setUser(userDb);

    return newPurchase;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  };
};

const removeFromCart = async (comic_issue: IssueAttributes, user_id: string) => {
  try {
    const purchase = await db.Purchase.findOne({
      where: { user_id },
      include: {
        model: db.Issue,
        as: 'issues',
        through: { attributes: [] },
        where: { id: comic_issue.id }
      },
      attributes: ['id']
    });

    const issue = await db.Issue.findByPk(comic_issue.id);

    if (!purchase || !issue) return null;

    await purchase.removeIssue(issue);
  } catch (error) {
    console.error(error);
    throw error;
  };
};

const getIssuesInCart = async (user_id: string) => {
  try {
    const purchases = await db.Purchase.findAll({
      where: { user_id, status: 'In Cart' },
      include: {
        model: db.Issue,
        as: 'issues',
        through: { attributes: [] }
      }
    });

    const issues = purchases.flatMap(p => p.issues);
    return issues;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// TODO: Not sure what this function does. Commented out until connected to the frontend to see the flow and behavior.
/* const mysteryFunction = async (comic: any, user_id: string, card_type: string, status: any) => {
  try {
    const issueId = await db.PurchaseComic.findAll({
      where: { issueId: comic.id, },
      attributes: ['purchaseId']
    })

    let purchasesId: any = []

    if (issueId.length > 0) {
      issueId.map((e: any) => purchasesId.push(e.toJSON().purchaseId))
      for (let i = 0; i < purchasesId.length; i++) {
        const purchase = await db.Purchase.findOne({
          where: { id: purchasesId[i], user_id, status: 'In Cart' }
        })

        if (purchase) {
          await purchase.update({
            status,
            payment_method: card_type == 'credit' ? 'Credit Card' : 'Debit Card'
          })
        }
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}; */

export { processPayment, addToCart, removeFromCart, getIssuesInCart };