class Job {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }
}

class User {
    constructor(firstname, lastname, cash, job) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.cash = cash;
        this.job = job;

        this.assets = [];
        this.liabilities = [];
    }

    addAsset(a) {
        var exist = false;

        for (var i=0; i<this.assets.length; i++) {
            var asset = this.assets[i];
            if (asset.name == a.name) {
                asset.amount++;
                exist = true;
                break;
            }
        }

        if (!exist) {
            this.assets.push(a);
        }
    }

    removeAsset(a) {
        var remove = false;

        for (var i=0; i<this.assets.length; i++) {
            var asset = this.assets[i];
            if (asset.name == a.name) {
                asset.amount--;
                
                if (asset.amount <= 0) {
                    remove = true;
                }
                break;
            }
        }
        
        if (remove) {
            this.assets.pop(a);
        }
    }

    addLiability(l) {
        this.liabilities.push(l);
    }

    addCash(value) {
        this.cash += value;
    }

    displayedName() {
        return this.firstname + " " + this.lastname;
    }

    income() {
        var income = 0;
        
        income += this.job.salary;
        
        for (i = 0; i < this.assets.length; i++) {
            income += this.assets[i].fullCashflow();
        }

        return income;
    }

    outgoing() {
        var outgoing = 0;

        for (i = 0; i < this.liabilities.length; i++) {
            outgoing += this.liabilities[i].cost;
         }

        return outgoing;        
    }

    cashflow() {
        return this.income() - this.outgoing();
    }
}

