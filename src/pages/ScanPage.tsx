import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Pencil, X, Zap } from "lucide-react";
import {
  FoodGlyph,
  type FoodGlyphName,
} from "../components/FoodGlyph";
import { useI18n } from "../i18n/useI18n";

const BASE_CALORIES = 610;
const BASE_MACROS = { protein: 34, carbs: 72, fat: 18 };

const ingredients: {
  glyph: FoodGlyphName;
  en: string;
  zh: string;
}[] = [
  { glyph: "noodles", en: "Noodles", zh: "面条" },
  { glyph: "beef", en: "Beef", zh: "牛肉" },
  { glyph: "leaf", en: "Bok choy", zh: "小白菜" },
  { glyph: "onion", en: "Spring onion", zh: "小葱" },
];

function ScanFrame() {
  return (
    <svg
      aria-hidden="true"
      className="scan-frame"
      fill="none"
      viewBox="-2.5 -2.5 239 219"
    >
      <path
        d="M0 37V11C0 8.08262 1.15893 5.28473 3.22183 3.22183C5.28473 1.15893 8.08262 0 11 0H37M197 0H223C225.917 0 228.715 1.15893 230.778 3.22183C232.841 5.28473 234 8.08262 234 11V37M234 177V203C234 205.917 232.841 208.715 230.778 210.778C228.715 212.841 225.917 214 223 214H197M37 214H11C8.08262 214 5.28473 212.841 3.22183 210.778C1.15893 208.715 0 205.917 0 203V177"
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeWidth="5"
      />
    </svg>
  );
}

function NoodleBowlIllustration() {
  return (
    <svg
      aria-hidden="true"
      className="scan-illustration"
      fill="none"
      viewBox="0 0 240 190"
    >
      <path
        d="M25 48c7-10 18-14 30-12M188 48c-5-11-15-16-27-16M113 34c-5-9-2-16 2-21"
        stroke="#F6E9DB"
        strokeLinecap="round"
        strokeWidth="4"
        opacity=".7"
      />
      <path
        d="M83 64c8 29 10 53 22 65M115 72c10 31 8 49 18 63M147 67c2 26-2 47 8 64"
        stroke="#F7C04B"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <path
        d="m128 78 58-39M140 82l57-34"
        stroke="#E1B36B"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <ellipse cx="120" cy="93" rx="75" ry="20" fill="#F0A34A" />
      <ellipse cx="120" cy="89" rx="70" ry="16" fill="#FFD27A" />
      <path
        d="M45 91c4 49 29 79 75 79s71-30 75-79c-20 12-45 18-75 18S65 103 45 91Z"
        fill="#F8F3EA"
        stroke="#D9CBBB"
        strokeWidth="2"
      />
      <path
        d="M51 113c17 10 42 15 69 15 29 0 53-5 70-15"
        stroke="#EAE0D3"
        strokeWidth="2"
      />
      <path
        d="M75 131c8 7 16 9 26 9M139 140c10 0 18-3 26-9"
        stroke="#D95B49"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <path
        d="M77 123h12M97 128h15M149 128h12M165 123h8"
        stroke="#D95B49"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <ellipse cx="120" cy="160" rx="45" ry="7" fill="#000" opacity=".16" />
    </svg>
  );
}

export function ScanPage() {
  const navigate = useNavigate();
  const { isChinese, t } = useI18n();
  const [portion, setPortion] = useState(1);
  const calories = new Intl.NumberFormat("en-GB").format(
    BASE_CALORIES * portion,
  );

  function updatePortion(delta: number) {
    setPortion((current) => Math.min(5, Math.max(1, current + delta)));
  }

  return (
    <main className="scan-page">
      <section
        className="scan-camera"
        aria-label={t("Food camera preview", "食物相机预览")}
      >
        <div className="scan-camera-top">
          <button
            aria-label={t("Close food scan", "关闭食物扫描")}
            className="scan-round-button"
            onClick={() => navigate("/home")}
            type="button"
          >
            <X aria-hidden="true" size={17} />
          </button>
          <strong>{t("Scan food", "扫描食物")}</strong>
          <button
            aria-label={t("Toggle flash", "切换闪光灯")}
            className="scan-round-button"
            type="button"
          >
            <Zap aria-hidden="true" size={17} />
          </button>
        </div>
        <NoodleBowlIllustration />
        <ScanFrame />
        <span className="scan-detected">
          <Check aria-hidden="true" size={13} />
          {t("Detected", "已识别")}
        </span>
      </section>

      <section
        className="scan-sheet"
        aria-label={t("Food recognition result", "食物识别结果")}
      >
        <div aria-hidden="true" className="scan-sheet-handle" />
        <header className="scan-result-heading">
          <div>
            <h1>{t("Beef Noodle Soup", "牛肉面")}</h1>
            <button className="scan-edit" type="button">
              <Pencil aria-hidden="true" size={12} />
              {t("Not right? Edit dish", "识别不对？编辑菜品")}
            </button>
          </div>
          <span className="scan-match">{t("92% match", "92% 匹配")}</span>
        </header>

        <div className="scan-calorie-card">
          <div>
            <p className="scan-calories">
              ≈{" "}
              <span aria-label={t("Estimated calories", "估算热量")}>
                {calories}
              </span>{" "}
              <small>{t("kcal", "千卡")}</small>
            </p>
            <p className="scan-estimate">
              {t("Estimated for 1 bowl (≈550 g)", "按 1 碗估算（约 550 克）")}
            </p>
          </div>
          <div className="scan-stepper">
            <button
              aria-label={t("Decrease portion", "减少份量")}
              onClick={() => updatePortion(-1)}
              type="button"
            >
              −
            </button>
            <b aria-label={t("Portion quantity", "份量")}>{portion}</b>
            <button
              aria-label={t("Increase portion", "增加份量")}
              onClick={() => updatePortion(1)}
              type="button"
            >
              +
            </button>
          </div>
        </div>

        <div className="scan-macros">
          <div className="scan-macro">
            <span>{t("Protein", "蛋白质")}</span>
            <i>
              <b style={{ width: "62%", background: "var(--accent)" }} />
            </i>
            <strong>{BASE_MACROS.protein * portion} g</strong>
          </div>
          <div className="scan-macro">
            <span>{t("Carbs", "碳水")}</span>
            <i>
              <b style={{ width: "78%", background: "var(--amber)" }} />
            </i>
            <strong>{BASE_MACROS.carbs * portion} g</strong>
          </div>
          <div className="scan-macro">
            <span>{t("Fat", "脂肪")}</span>
            <i>
              <b style={{ width: "40%", background: "var(--coral)" }} />
            </i>
            <strong>{BASE_MACROS.fat * portion} g</strong>
          </div>
        </div>

        <div className="scan-ingredients">
          <h2>{t("Detected ingredients", "识别到的食材")}</h2>
          <div className="scan-chips">
            {ingredients.map((ingredient) => (
              <span className="scan-chip" key={ingredient.en}>
                <FoodGlyph name={ingredient.glyph} size={14} />
                {isChinese ? ingredient.zh : ingredient.en}
              </span>
            ))}
          </div>
        </div>

        <button
          aria-label={t(
            "Log to Dinner — add to today's log",
            "记录为晚餐——添加到今日记录",
          )}
          className="scan-log-button"
          onClick={() => navigate("/home")}
          type="button"
        >
          <Check aria-hidden="true" size={17} />
          {t("Log to Dinner", "记录为晚餐")}
        </button>
      </section>
    </main>
  );
}
