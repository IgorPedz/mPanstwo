import { useEffect, useMemo } from "react";
import {
    DndContext,
    closestCorners,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";

import { restrictToParentElement } from "@dnd-kit/modifiers";
import { SortableContext, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable";

import Tile from "./Tile";
import AddTile from "./AddTile";
import { motion, AnimatePresence } from "framer-motion";

export default function TilesGrid({
    tiles,
    setTiles,
    currentTiles,
    currentPage,
    totalPages,
    setShowAddMenu,
    isLocked,
}) {
    const handleDragEnd = ({ active, over }) => {
        if (isLocked) return;
        if (!over || active.id === over.id) return;

        setTiles((items) => {
            const oldIndex = items.findIndex((i) => i.id === active.id);
            const newIndex = items.findIndex((i) => i.id === over.id);
            return arrayMove(items, oldIndex, newIndex);
        });
    };

    // ✅ FIX: desktop + mobile
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // desktop: klik vs drag
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 180, // mobile long-press
                tolerance: 8,
            },
        })
    );

    const sortableItems = useMemo(
        () => currentTiles.map((t) => t.id),
        [currentTiles]
    );

    useEffect(() => {
        const prevent = (e) => e.preventDefault();

        document.addEventListener("touchmove", prevent, { passive: false });

        return () => {
            document.removeEventListener("touchmove", prevent);
        };
    }, []);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToParentElement]}
        >
            <SortableContext items={sortableItems} strategy={rectSortingStrategy}>
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 touch-none"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.35 }}
                        >
                            {currentTiles.map((tile) => (
                                <Tile
                                    key={tile.id}
                                    {...tile}
                                    isLocked={isLocked}
                                    className="w-full"
                                    onDelete={
                                        isLocked
                                            ? undefined
                                            : () =>
                                                  setTiles((prev) =>
                                                      prev.filter((t) => t.id !== tile.id)
                                                  )
                                    }
                                />
                            ))}

                            {!isLocked && currentPage === totalPages - 1 && (
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