import React from "react";
import styled from "./TemplateCard.module.css";

type Variant = "default" | "minimal" | "bold";

const Card: React.FC = () => {
  const variants = [
    { id: "watermark" as Variant, label: "Watermark" },
    { id: "grid" as Variant, label: "Grid Layout" },
    { id: "card" as Variant, label: "Card View" },
  ];

  const currentVariant = "default" as Variant;

  return (
    <div
      className={styled.card}
      style={{ borderLeft: `4px solid #6366f1`, paddingBottom: 15 }}
    >
      <img
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='80'%3E%3Crect fill='%23333' width='120' height='80'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23888' font-family='sans-serif' font-size='12'%3EImage%3C/text%3E%3C/svg%3E"
        alt=""
        className={styled.thumbnail}
      />
      <div className={styled.flexWrap}>
        <button className={styled.button}>
          Switch to {variants.find((v) => v.id === currentVariant)?.label ?? currentVariant}
        </button>
      </div>
      <div className={styled.mt3}>
        <span className={styled.fontMedium}>{currentVariant}</span>
        <span className={styled.textGrey400}>
          {variants.find((v) => v.id === currentVariant)?.label ?? currentVariant}
        </span>
      </div>
    </div>
  );
};

export const TemplateCard: React.FC = () => {
  return <Card />;
};
