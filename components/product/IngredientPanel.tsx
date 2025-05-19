import Image from "next/image";
import type { Product } from "@/lib/commerce/types";
import { images } from "@/lib/data/home";

export function IngredientPanel({
  ingredients,
}: {
  ingredients: NonNullable<Product["ingredients"]>;
}) {
  const photo = images.cells;

  return (
    <section className="sec" id="ingredients">
      <div className="wrap split split-rev">
        <div className="split-copy">
          <p className="eyebrow">Ingredient panel</p>
          <h2>Everything in the scoop, listed plainly</h2>
          <p>
            Five blends, 42 ingredients, and the exact amount of each group per serving. No fillers,
            no artificial sweeteners, colors or flavors. Vegan, and made without gluten, dairy or
            soy.
          </p>
          <table className="panel">
            <caption>{ingredients.caption}</caption>
            <tbody>
              {ingredients.groups.map((group) => (
                <tr key={group.name}>
                  <th scope="row">
                    <b>{group.name}</b>
                    <small>{group.ingredients}</small>
                  </th>
                  <td>{group.grams}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="fine">
            Full supplement facts and allergen information are printed on every pouch.
          </p>
        </div>
        <div className="split-media tall">
          <Image
            className="cover"
            src={photo.url}
            alt={photo.altText}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 960px) 100vw, 45vw"
          />
        </div>
      </div>
    </section>
  );
}
