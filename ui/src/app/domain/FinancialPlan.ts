export type FunderId = string;

export class FinancialPlan {
    funderId: FunderId;
    expenseItems: AnnualExpenseItem[];

    public static empty(): FinancialPlan {
        return {
            funderId: null,
            expenseItems: []
        };
    }
}

export interface AnnualExpenseItem {
    year: number;
    expenseType: string;
    amount: number;
    description: string;
}
