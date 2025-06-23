"use client";

import React, { useState } from "react";
import TokenBar from "@/components/customs/TokenBar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import Header from "@/components/customs/header";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

const plans = [
	{
		name: "Free",
		price: 0,
		tokens: 50000,
		features: ["50,000 tokens included", "Basic AI access", "Community support"],
		cta: "Current Plan",
		highlight: true,
	},
	{
		name: "Pro",
		price: 9,
		tokens: 500000,
		features: ["500,000 tokens included", "Priority AI access", "Email support"],
		cta: "Buy Now",
		highlight: false,
	},
	{
		name: "Ultimate",
		price: 29,
		tokens: 2000000,
		features: ["2,000,000 tokens included", "Fastest AI access", "Premium support"],
		cta: "Buy Now",
		highlight: false,
	},
];

const PricingPage = () => {
	const { data: session } = useSession();
	const [loading, setLoading] = useState(false);
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
	// Placeholder for payment integration
	const handleBuy = (plan: typeof plans[number]) => {
		setLoading(true);
		// Integrate payment gateway here (e.g., Razorpay)
		setTimeout(() => setLoading(false), 1200);
		alert(`Redirecting to payment for ${plan.name}`);
	};

	return (
        <>
        <Header setIsLoginDialogOpen={setIsLoginDialogOpen}/>
		<div className="max-w-4xl mx-auto  px-4 scrollbar-hide">
            
			<h1 className="text-4xl font-bold text-center mb-2 text-primary">Pricing</h1>
			<p className="text-center text-muted-foreground mb-8">
				Choose the plan that fits your needs. Upgrade anytime!
			</p>
			<div className="mb-8 flex justify-center">
				<div className="w-full max-w-md">
					<TokenBar />
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{plans.map((plan, idx) => (
					<div
						key={plan.name}
						className={`rounded-2xl border shadow-lg p-8 flex flex-col items-center bg-card transition-transform hover:scale-105 ${
							plan.highlight ? "border-primary/70 ring-2 ring-primary/30" : "border-border"
						}`}
					>
						<h2 className="text-2xl font-semibold mb-2 text-primary-foreground bg-primary px-4 py-1 rounded-full">
							{plan.name}
						</h2>
						<div className="text-4xl font-bold my-4 text-primary">
							{plan.price === 0 ? "Free" : `₹${plan.price}`}
						</div>
						<div className="text-lg mb-4 text-muted-foreground">
							{plan.tokens.toLocaleString()} tokens
						</div>
						<Separator className="my-4" />
						<ul className="mb-6 space-y-2 w-full">
							{plan.features.map((feature) => (
								<li key={feature} className="flex items-center text-sm text-foreground">
									<span className="mr-2 text-primary">•</span> {feature}
								</li>
							))}
						</ul>
						<Button
							className="w-full mt-auto"
							variant={plan.price === 0 ? "outline" : "default"}
							disabled={plan.price === 0 || loading}
							onClick={() => handleBuy(plan)}
						>
							{plan.price === 0 ? plan.cta : loading ? "Processing..." : plan.cta}
						</Button>
					</div>
				))}
			</div>
			<div className="text-xs text-center text-muted-foreground mt-8 flex flex-col items-center">
				Payment integration coming soon. For questions, contact support.
                <span>khushramnani@gmail.com</span>
			</div>
            
		</div>
        </>
	);
};

export default PricingPage;
