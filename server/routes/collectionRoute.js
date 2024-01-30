import { Router } from "express";

import { collectionController } from "../controllers/collectionController";
import auth from "../middleware/auth";

const router = Router();

router.post("/collection", auth, collectionController.createCollection);
router.get("/collections", auth, collectionController.getCollections);
router.delete(
  "/collection/:collectionId",
  auth,
  collectionController.deleteCollection
);
router.get(
  "/collection/:collectionId",
  auth,
  collectionController.getCollection
);
router.put(
  "/collection/:collectionId",
  auth,
  collectionController.updateCollection
);

export default router;
