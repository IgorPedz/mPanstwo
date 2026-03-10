import { DndContext, closestCenter } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { SortableContext, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import Tile from "./Tile";
import AddTile from "./AddTile";
import { motion, AnimatePresence } from "framer-motion";

export default function TilesGrid({ tiles, setTiles, currentTiles, currentPage, totalPages, setShowAddMenu }) {

    const handleDragEnd = ({ active, over }) => {
        if (over && active.id !== over.id) {
            setTiles(items => {
                const oldIndex = items.findIndex(i => i.id === active.id);
                const newIndex = items.findIndex(i => i.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const sortableItems = currentTiles.map(t => t.id);

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToParentElement]}
        >
            <SortableContext items={sortableItems} strategy={rectSortingStrategy}>
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage} // klucz zmienia się przy zmianie strony
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ type: "tween", duration: 0.4 }}
                        >
                            {currentTiles.map(tile => (
                                <Tile
                                    key={tile.id}
                                    {...tile}
                                    onDelete={() => setTiles(prev => prev.filter(t => t.id !== tile.id))}
                                    className="w-full"
                                />
                            ))}
                            {console.log(currentPage)}
                            {currentPage === totalPages - 1 && (
                                    <AddTile
                                        onClick={() => setShowAddMenu(true)}
                                        className="w-full"
                                    />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </SortableContext>
        </DndContext>
    );
}