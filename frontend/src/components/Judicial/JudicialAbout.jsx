import { motion } from "framer-motion";

export default function JudicialAbout({ description }) {
  return (
    <motion.div className="rounded-3xl border p-7 md:p-8">
      <p className="section-label">O instytucji</p>

      <p className="leading-relaxed">{description}</p>
    </motion.div>
  );
}
