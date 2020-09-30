import { MainLayout } from "../../components/Layouts/MainLayout/MainLayout";
import classes from "./about.module.scss";

export default function About() {
    return (
        <MainLayout title="about">
            <h2 className={classes.title}>Beer-Brined Scallops Over Asparagus With Stout Romesco</h2>
            <p>
                The secret to getting a restaurant-quality sear on your scallops starts long before you heat the 
                frying pan, and it’s an important step that will give your dish a professional level taste. The 
                issue most home cooks have with getting that lovely crust on their scallops has nothing to do with 
                their abilities: it’s the scallops themselves. Most scallops are soaked in a phosphate solution that 
                allows them to stay fresher longer. This same solution prevents the little sea creatures from searing 
                properly and instead lends a slightly “soapy” taste once cooked.

                The answer: either buy freshly harvested scallops that never see the need for this freshness extending 
                liquid (hard to do in the vast majority of the world), or give them a good soak in a nice brine. A brine 
                lp “wash” the solution out of the scallops, letting you avoid the soapy taste, and giving you a nice crust. 
                It’s the easiest way to impress your dinner guests with the best home-cooked scallops they’ve ever had. Yield: 
                4 servings.
            </p>

            <h2 className={classes.title}>Preparation</h2>
            <p>
                1. In a large bowl stir together the pale ale, salt, water and lemon juice.<br />
                2. Add the scallops, cover and refrigerate for an hour.<br />
                3. rain the scallops and place on top of a stack of paper towels. Add another layer of paper towels and 
                allow to drain and dry for 15 minutes.<br />
                4. Make the romesco. Add the almonds to a pan over medium high heat. Pull the pan back and forth across 
                the burner to toss the almonds until they have lightly toasted, about three minutes (keep a close eye, 
                they burn quickly).<br />
                5. Add the almonds, red bell pepper, garlic, tomato puree, parsley, beer, red pepper flakes, smoked 
                paprika, salt and pepper to a food processor.<br />
                6. Process for about one minute, then slowly add the olive oil until well combined (romesco can be made 
                several days in advance, store in an air-tight container in the fridge until ready to use).<br />
                7. Melt two tablespoons butter in a skillet over medium high heat until very hot. Add the scallops, 
                flat side down, and allow to cook until a dark golden brown crust forms on the bottom, about two minutes. 
                Flip and cook until seared on the opposite side. Remove from pan when a slight hint of translucent pink still 
                remains at the center—don’t overcook.<br />
                8. Melt three tablespoons butter in a large skillet over high heat (you want the asparagus to form a nice 
                char but to still retain a good bite and not get soggy, if the heat is too low the asparagus will overcook 
                before getting the desired char). Add the asparagus, tossing until most of the asparagus has charred slightly
                on one or both sides, remove from pan.<br />
                9. Plate the asparagus, top with romesco sauce and scallops, serve immediately.<br />
            </p>
        </MainLayout>
    )
}