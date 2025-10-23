"use client";
import { useParams, useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function DetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id;

  // Validation Schema
  const validationSchema = Yup.object({
    overallSubmissionStatus: Yup.string().required(
      "Overall Submission Status is required"
    ),
    allPreChecks: Yup.string().required("This field is required"),
    previousEPCDifferences: Yup.string().required("This field is required"),
    preparationsPlanning: Yup.string().required("This field is required"),
    c1AssessmentPAS: Yup.string().required("This field is required"),
    eprPreDesign: Yup.string().required("This field is required"),
    preVentilationRC1Docs: Yup.string().required("This field is required"),
    pasHubCreateDesign: Yup.string().required("This field is required"),
    postVentilation: Yup.string().required("This field is required"),
    scaffoldingAssign: Yup.string().required("This field is required"),
    material: Yup.string().required("This field is required"),
    planDesignPIBI: Yup.string().required("This field is required"),
    retrofitDesignCheck: Yup.string().required("This field is required"),
    paperwork: Yup.string().required("This field is required"),
    customerSignatures: Yup.string().required("This field is required"),
    pasHubUploadDesign: Yup.string().required("This field is required"),
    loftBoilerHC: Yup.string().required("This field is required"),
    ewiInstallation: Yup.string().required("This field is required"),
    midInstallC2Packs: Yup.string().required("This field is required"),
    postInstallEWIPacks: Yup.string().required("This field is required"),
    internalC3Inspection: Yup.string().required("This field is required"),
    pendingEWIIssues: Yup.string().required("This field is required"),
    gdgc: Yup.string().required("This field is required"),
    ewiProWarranty: Yup.string().required("This field is required"),
    externalC3Status: Yup.string().required("This field is required"),
    pashubUploading: Yup.string().required("This field is required"),
    scaffoldingRemoval: Yup.string().required("This field is required"),
    rubbishCollections: Yup.string().required("This field is required"),
    customerFeedbacks: Yup.string().required("This field is required"),
    teamNotResponding: Yup.string().required("This field is required"),
    measuresABSSAP: Yup.string().required("This field is required"),
    audit: Yup.string().required("This field is required"),
    installer: Yup.string().required("This field is required"),
    customerCopyDelivered: Yup.string().required("This field is required"),
    liveJobSheetStatus: Yup.string().required("This field is required"),
    surveyDate: Yup.date().required("Survey date is required"),
    firstPhotoDate: Yup.date().required("First photo date is required"),
    ubilDate: Yup.date().required("UBIL date is required"),
    loftInstallDate: Yup.date().required("Loft install date is required"),
    ewiMeasuresDate: Yup.date().required("EWI measures date is required"),
    boilerHCInstallDate: Yup.date().required(
      "Boiler/HC install date is required"
    ),
    extractorFansDate: Yup.date().required("Extractor fans date is required"),
    handoverDate: Yup.date().required("Handover date is required"),
  });

  const formik = useFormik({
    initialValues: {
      overallSubmissionStatus: "",
      allPreChecks: "",
      previousEPCDifferences: "",
      preparationsPlanning: "",
      c1AssessmentPAS: "",
      eprPreDesign: "",
      preVentilationRC1Docs: "",
      pasHubCreateDesign: "",
      postVentilation: "",
      scaffoldingAssign: "",
      material: "",
      planDesignPIBI: "",
      retrofitDesignCheck: "",
      paperwork: "",
      customerSignatures: "",
      pasHubUploadDesign: "",
      loftBoilerHC: "",
      ewiInstallation: "",
      midInstallC2Packs: "",
      postInstallEWIPacks: "",
      internalC3Inspection: "",
      pendingEWIIssues: "",
      gdgc: "",
      ewiProWarranty: "",
      externalC3Status: "",
      pashubUploading: "",
      scaffoldingRemoval: "",
      rubbishCollections: "",
      customerFeedbacks: "",
      teamNotResponding: "",
      measuresABSSAP: "",
      audit: "",
      installer: "",
      customerCopyDelivered: "",
      liveJobSheetStatus: "",
      surveyDate: "",
      firstPhotoDate: "",
      ubilDate: "",
      loftInstallDate: "",
      ewiMeasuresDate: "",
      boilerHCInstallDate: "",
      extractorFansDate: "",
      handoverDate: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      alert("Form submitted successfully!");
    },
  });

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Project Details - {projectId}
            </h1>
            <p className="text-gray-600">Home &gt; Projects &gt; Detail</p>
          </div>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
        </div>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Text Input Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Overall Submission Status
              </label>
              <input
                type="text"
                name="overallSubmissionStatus"
                value={formik.values.overallSubmissionStatus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.overallSubmissionStatus &&
                formik.errors.overallSubmissionStatus && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.overallSubmissionStatus}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                All Pre Checks, UBILS, UBIL videos, Datamatch, HHEV and EPR
              </label>
              <input
                type="text"
                name="allPreChecks"
                value={formik.values.allPreChecks}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.allPreChecks && formik.errors.allPreChecks && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.allPreChecks}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Previous EPC Differences and GCGP
              </label>
              <input
                type="text"
                name="previousEPCDifferences"
                value={formik.values.previousEPCDifferences}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.previousEPCDifferences &&
                formik.errors.previousEPCDifferences && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.previousEPCDifferences}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preparations/Planning Pre Loft, Ventilation, Pre HC, Pre Boiler,
                Pre FTCH Adjustments, Management
              </label>
              <input
                type="text"
                name="preparationsPlanning"
                value={formik.values.preparationsPlanning}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.preparationsPlanning &&
                formik.errors.preparationsPlanning && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.preparationsPlanning}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                C1 Assessment and PAS
              </label>
              <input
                type="text"
                name="c1AssessmentPAS"
                value={formik.values.c1AssessmentPAS}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.c1AssessmentPAS &&
                formik.errors.c1AssessmentPAS && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.c1AssessmentPAS}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                EPR, Pre design, Assessment
              </label>
              <input
                type="text"
                name="eprPreDesign"
                value={formik.values.eprPreDesign}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.eprPreDesign && formik.errors.eprPreDesign && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.eprPreDesign}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pre Ventilation and RC 1 Docs
              </label>
              <input
                type="text"
                name="preVentilationRC1Docs"
                value={formik.values.preVentilationRC1Docs}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.preVentilationRC1Docs &&
                formik.errors.preVentilationRC1Docs && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.preVentilationRC1Docs}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PAS hub Create Design MTIP and IOE
              </label>
              <input
                type="text"
                name="pasHubCreateDesign"
                value={formik.values.pasHubCreateDesign}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.pasHubCreateDesign &&
                formik.errors.pasHubCreateDesign && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.pasHubCreateDesign}
                  </div>
                )}
            </div>
          </div>

          {/* More Text Input Fields - Column 2 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Post Ventilation
              </label>
              <input
                type="text"
                name="postVentilation"
                value={formik.values.postVentilation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.postVentilation &&
                formik.errors.postVentilation && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.postVentilation}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scaffolding Assign
              </label>
              <input
                type="text"
                name="scaffoldingAssign"
                value={formik.values.scaffoldingAssign}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.scaffoldingAssign &&
                formik.errors.scaffoldingAssign && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.scaffoldingAssign}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Material
              </label>
              <input
                type="text"
                name="material"
                value={formik.values.material}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.material && formik.errors.material && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.material}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plan, Design, PIBI, Survey folder Add all issues and responses
              </label>
              <input
                type="text"
                name="planDesignPIBI"
                value={formik.values.planDesignPIBI}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.planDesignPIBI &&
                formik.errors.planDesignPIBI && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.planDesignPIBI}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Retrofit Design Check and Plan
              </label>
              <input
                type="text"
                name="retrofitDesignCheck"
                value={formik.values.retrofitDesignCheck}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.retrofitDesignCheck &&
                formik.errors.retrofitDesignCheck && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.retrofitDesignCheck}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Paper Work Link to Live sheet paperwork
              </label>
              <input
                type="text"
                name="paperwork"
                value={formik.values.paperwork}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.paperwork && formik.errors.paperwork && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.paperwork}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer signatures Original
              </label>
              <input
                type="text"
                name="customerSignatures"
                value={formik.values.customerSignatures}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.customerSignatures &&
                formik.errors.customerSignatures && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.customerSignatures}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PAS hub Upload Design and RC1 and move to installation
              </label>
              <input
                type="text"
                name="pasHubUploadDesign"
                value={formik.values.pasHubUploadDesign}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.pasHubUploadDesign &&
                formik.errors.pasHubUploadDesign && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.pasHubUploadDesign}
                  </div>
                )}
            </div>
          </div>

          {/* Date Fields and Remaining Text Fields - Column 3 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loft, Boiler and HC
              </label>
              <input
                type="text"
                name="loftBoilerHC"
                value={formik.values.loftBoilerHC}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.loftBoilerHC && formik.errors.loftBoilerHC && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.loftBoilerHC}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                EWI installation
              </label>
              <input
                type="text"
                name="ewiInstallation"
                value={formik.values.ewiInstallation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.ewiInstallation &&
                formik.errors.ewiInstallation && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.ewiInstallation}
                  </div>
                )}
            </div>

            {/* Date Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Survey date
              </label>
              <input
                type="date"
                name="surveyDate"
                value={formik.values.surveyDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.surveyDate && formik.errors.surveyDate && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.surveyDate}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First photo of ANY First install
              </label>
              <input
                type="date"
                name="firstPhotoDate"
                value={formik.values.firstPhotoDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.firstPhotoDate &&
                formik.errors.firstPhotoDate && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.firstPhotoDate}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                UBIL date
              </label>
              <input
                type="date"
                name="ubilDate"
                value={formik.values.ubilDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.ubilDate && formik.errors.ubilDate && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.ubilDate}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loft install date
              </label>
              <input
                type="date"
                name="loftInstallDate"
                value={formik.values.loftInstallDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.loftInstallDate &&
                formik.errors.loftInstallDate && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.loftInstallDate}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                EWI Measures install date complete
              </label>
              <input
                type="date"
                name="ewiMeasuresDate"
                value={formik.values.ewiMeasuresDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.ewiMeasuresDate &&
                formik.errors.ewiMeasuresDate && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.ewiMeasuresDate}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Boiler/HC install Date
              </label>
              <input
                type="date"
                name="boilerHCInstallDate"
                value={formik.values.boilerHCInstallDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.boilerHCInstallDate &&
                formik.errors.boilerHCInstallDate && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.boilerHCInstallDate}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Extractor fans ventilation date
              </label>
              <input
                type="date"
                name="extractorFansDate"
                value={formik.values.extractorFansDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.extractorFansDate &&
                formik.errors.extractorFansDate && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.extractorFansDate}
                  </div>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Handover date
              </label>
              <input
                type="date"
                name="handoverDate"
                value={formik.values.handoverDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.handoverDate && formik.errors.handoverDate && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.handoverDate}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Submit Form
          </button>
        </div>
      </form>
    </Layout>
  );
}
