import CoffeeIcon from "@/assets/icons/coffee.svg";
import JuiceIcon from "@/assets/icons/juice.svg";
import MenuIcon from "@/assets/icons/menu.svg";
import PastriesIcon from "@/assets/icons/pasteries.svg";
import SodaIcon from "@/assets/icons/soda.svg";
import TeaIcon from "@/assets/icons/tea.svg";
import WaterIcon from "@/assets/icons/water.svg";

import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles/inventoryStyles"; // Ensure this is included!

const icons = {
  coffee: CoffeeIcon,
  tea: TeaIcon,
  juice: JuiceIcon,
  soda: SodaIcon,
  water: WaterIcon,
  pastries: PastriesIcon,
  menu: MenuIcon,
};

export function InventoryCategory({
  category,
}: {
  category: keyof typeof icons;
}) {
  const IconComponent = icons[category];

  return (
    <View style={styles.categoryWrapper}>
      {IconComponent && <IconComponent width={32} height={32} />}
      <Text style={styles.categoryText}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Text>
    </View>
  );
}
