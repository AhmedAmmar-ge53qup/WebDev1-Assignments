import AccountRepo from "../repository/account-repo.js";

const accountRepo = new AccountRepo()

class AccountService {
    async getAccounts(req, res) {
        try {
            const accounts = await accountRepo.getAccounts(req.query.type)
            res.status(200).json(accounts)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async addAccount(req, res) {
        try {
            const newAccount = await accountRepo.addAccount(req.body)
            res.status(201).json(newAccount)
        } catch (e) {
            res.status(500).json(e)
        }

    }

    async updateAccount(req, res) {
        try {
            const account = req.body
            res.json(await accountRepo.addAccount(account))
        } catch (e) {
            res.status(500).json(e)
        }

    }

    async getAccount(req, res) {
        try {
            const acctNo = req.params.acctNo
            res.json(await accountRepo.getAccount(acctNo))
        } catch (e) {
            res.status(500).json(e)
        }

    }

    async deleteAccount(req, res) {
        try {
            res.json(await accountRepo.deleteAccount(req.params.acctNo))
        } catch (e) {
            res.status(500).json(e)
        }

    }

    async addTransaction(req, res) {
        try {
            const transaction = req.body
            const trans = await accountRepo.addTransaction(transaction)
            res.json(trans)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getTransactions(req, res) {
        try {
            const transactions = await accountRepo.getTransactions()
            res.json(transactions)
        } catch (e) {
            res.status(500).json(e)
        }
    }


    async getStats(req, res) {
        try {
            res.json(await accountRepo.getStats())
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async renderIndex(req, res) {
        try {
            res.render('index', {title: 'Index'});
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async renderAddAccount(req, res) {
        try {
            res.render('add-acct', {title: 'Add Account'});
        } catch (e) {
            res.send(500).send(e);
        }
    }

    async renderAddTransaction(req, res) {
        try {
            const accounts = await accountRepo.getAccounts();
            accounts.forEach((a, i) => accounts[i] = {_id: a._id, balance: a.balance});

            res.render('acct-trans', {title: 'Add Transaction', accounts});
        } catch (e) {
            res.send(500).send(e);
        }
    }

}

export default new AccountService()
