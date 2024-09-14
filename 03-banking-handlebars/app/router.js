//web services [routes]
//Reading
import express from 'express'
import accountService from "./sevice/account-service.js";

const router = express.Router()

router.route('/api/accounts')
    .get(accountService.getAccounts)
    .post(accountService.addAccount)
    .put(accountService.updateAccount)


router.route('/api/accounts/stats')
    .get(accountService.getStats)

router.route('/api/accounts/transactions')
    .get(accountService.getTransactions)

router.route('/api/accounts/:acctNo')
    .get(accountService.getAccount)
    .delete(accountService.deleteAccount)

router.route('/api/accounts/:acctNo/trans')
    .post(accountService.addTransaction)

router.get('/', accountService.renderIndex)
router.get('/add-acct', accountService.renderAddAccount);
router.get('/acct-trans', accountService.renderAddTransaction);

export default router
