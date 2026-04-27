#![no_std]
use soroban_sdk::{contract, contractimpl, Env};

#[contract]
pub struct BazaarMesh;

#[contractimpl]
impl BazaarMesh {
    /// Executes the 20% Reciprocity Mandate STRICTLY on Profit
    pub fn calculate_split(env: Env, base_cost: i128, sale_price: i128) -> (i128, i128, i128, i128) {
        
        // 1. Sanity Check: Prevent negative profit trades
        if base_cost > sale_price {
            panic!("MESH HALT: Base cost exceeds sale price.");
        }

        let profit = sale_price - base_cost;
        
        // 2. Calculate 20% Fee strictly on profit
        let mut total_fee = (profit * 20) / 100;
        
        // 3. Sovereign Minimum (Only apply if there is actual profit)
        if total_fee < 1 && profit > 0 {
            total_fee = 1; 
        } else if profit == 0 {
            total_fee = 0;
        }

        // 4. The 60/30/10 Split Logic
        let treasury_cut = (total_fee * 60) / 100; // 60% Backing Vault
        let social_cut = (total_fee * 30) / 100;   // 30% Wellness Vault
        
        // 5. Remainder Sweep (Dust Protection for the 10% Legal Vault)
        let legal_cut = total_fee - treasury_cut - social_cut;

        // 6. Merchant net payout (Base cost returned + remaining profit)
        let merchant_net = sale_price - total_fee;

        (merchant_net, treasury_cut, social_cut, legal_cut)
    }
}

// ==========================================
// 🛠️ THE MESH SANDBOX (LOCAL TESTS) 🛠️
// ==========================================
#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::Env;

    #[test]
    fn test_perfect_profit_split() {
        let env = Env::default();
        let contract_id = env.register_contract(None, BazaarMesh);
        let client = BazaarMeshClient::new(&env, &contract_id);

        // Scenario: Merchant buys a shirt for 80, sells for 100.
        // Profit: 20. Fee: 4. 
        // Expected Split: Merchant (96), Treasury (2), Social (1), Legal (1).
        let (merchant, treasury, social, legal) = client.calculate_split(&80, &100);

        assert_eq!(merchant, 96);
        assert_eq!(treasury, 2);
        assert_eq!(social, 1);
        assert_eq!(legal, 1);
    }

    #[test]
    #[should_panic(expected = "MESH HALT: Base cost exceeds sale price.")]
    fn test_fraud_prevention() {
        let env = Env::default();
        let contract_id = env.register_contract(None, BazaarMesh);
        let client = BazaarMeshClient::new(&env, &contract_id);

        // Scenario: Merchant lies and says cost was 120, but sells for 100.
        // The MESH should instantly panic and block the transaction.
        client.calculate_split(&120, &100);
    }
}