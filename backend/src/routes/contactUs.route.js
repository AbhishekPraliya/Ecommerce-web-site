import express from 'express';
import {
    editAboutUsContent,
    getAboutUsData,
    getContactUsData,
    insertAddressDetails,
    insertHelpingDetails,
    updateAboutUsMiddleData,
    updateFooterHighlights,
    getPrivacyPolicyData,
    insertPrivacyPolicyData,
} from '../controllers/contactUs.controller.js';

const router = express.Router();

//// contactUs routes ////
router.get('/data', getContactUsData);
router.post('/insert/help-data', insertHelpingDetails);
router.post('/insert/address-details', insertAddressDetails);

//// aboutUs routes ////
router.get('/about-us', getAboutUsData);
router.put('/about-us/content', editAboutUsContent);
router.put('/about-us/middle', updateAboutUsMiddleData);
router.put('/about-us/footer', updateFooterHighlights);

//// PrivacyPolicy ////
router.get("/privacy-policy/get", getPrivacyPolicyData);
router.post("/privacy-policy/insert", insertPrivacyPolicyData);



export default router;
