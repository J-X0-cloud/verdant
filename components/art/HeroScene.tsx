import { Canister } from "./Canister";
import { Pouch } from "./Pouch";
import { Shaker } from "./Shaker";
import { Stick } from "./Stick";

/** The still life in the homepage hero: canister, pouch, two sticks and a shaker. */
export function HeroScene() {
  return (
    <div className="scene">
      <div className="scene-glow" />
      <div className="s-can">
        <Canister />
      </div>
      <div className="s-pouch">
        <Pouch />
      </div>
      <div className="s-stick s1">
        <Stick flavour="mint" />
      </div>
      <div className="s-stick s2">
        <Stick flavour="berry" />
      </div>
      <div className="s-shaker">
        <Shaker />
      </div>
      <div className="scene-floor" />
    </div>
  );
}
