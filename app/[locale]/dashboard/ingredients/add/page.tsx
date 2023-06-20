import IngredientForm from "@/app/[locale]/components/forms/ingredientForm";

export default async function page() {
    try {
        return (
            <IngredientForm />
        );
    } catch (error) {
        console.log("Error", error);
    }
}
