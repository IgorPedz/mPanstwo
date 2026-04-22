import { motion } from "framer-motion";

const SocialSection = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="mt-6 color-transition"
        >
            {children}
        </motion.div>
    );
};

export default SocialSection;