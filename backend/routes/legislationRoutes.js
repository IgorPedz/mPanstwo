const express = require("express");
const {
  getAllBills,
  getBillDetails,
  getLegislativeProcess,
  getOpinions,
  postOpinion,
  endorseOpinion,
  getBillVotings,
  getBillVotingDetail,
} = require("../controllers/legislationController");

const router = express.Router();

router.get("/legislation/bills",               getAllBills);
router.get("/legislation/bills/:num",          getBillDetails);
router.get("/legislation/bills/:num/process",  getLegislativeProcess);
router.get("/legislation/bills/:num/votings",              getBillVotings);
router.get("/legislation/votings/:sitting/:votNum",        getBillVotingDetail);
router.get("/legislation/bills/:num/opinions",      getOpinions);
router.post("/legislation/bills/:num/opinions",     postOpinion);
router.put("/legislation/opinions/:id/endorse",     endorseOpinion);

module.exports = router;
