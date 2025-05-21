import { NextResponse } from "next/server";
import { z } from "zod";
import { CartError, storefront } from "@/lib/commerce";
import type { Cart } from "@/lib/commerce/types";
import { getCurrentCart, getOrCreateCart } from "@/lib/cart-session";

const purchaseSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("one-time") }),
  z.object({
    type: z.literal("subscription"),
    frequencyDays: z.union([z.literal(30), z.literal(45), z.literal(60)]),
  }),
]);

const addSchema = z.object({
  lines: z
    .array(
      z.object({
        variantId: z.string().min(1),
        quantity: z.number().int().min(1).max(12),
        purchase: purchaseSchema,
      }),
    )
    .min(1),
});

const updateSchema = z.union([
  z.object({
    updates: z
      .array(
        z.object({
          lineId: z.string().min(1),
          quantity: z.number().int().min(0).max(12).optional(),
          purchase: purchaseSchema.optional(),
        }),
      )
      .min(1),
  }),
  z.object({ discountCode: z.string().trim().min(1).max(40) }),
]);

const removeSchema = z.object({ lineIds: z.array(z.string().min(1)).min(1) });

const ok = (cart: Cart | undefined) => NextResponse.json({ cart: cart ?? null });

function fail(error: unknown) {
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { error: "Invalid cart request", issues: error.issues },
      { status: 400 },
    );
  }
  if (error instanceof CartError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  console.error("[cart]", error);
  return NextResponse.json({ error: "Something went wrong with your cart" }, { status: 500 });
}

export async function GET() {
  return ok(await getCurrentCart());
}

export async function POST(request: Request) {
  try {
    const { lines } = addSchema.parse(await request.json());
    const cart = await getOrCreateCart();
    return ok(await storefront.addCartLines(cart.id, lines));
  } catch (error) {
    return fail(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const body = updateSchema.parse(await request.json());
    const cart = await getCurrentCart();
    if (!cart) throw new CartError("Your cart has expired. Please add your items again.", 404);
    return "updates" in body
      ? ok(await storefront.updateCartLines(cart.id, body.updates))
      : ok(await storefront.applyDiscountCode(cart.id, body.discountCode));
  } catch (error) {
    return fail(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const { lineIds } = removeSchema.parse(await request.json());
    const cart = await getCurrentCart();
    return ok(cart ? await storefront.removeCartLines(cart.id, lineIds) : undefined);
  } catch (error) {
    return fail(error);
  }
}
