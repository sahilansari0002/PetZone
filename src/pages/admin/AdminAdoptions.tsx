{/* Application Details Modal */}
{selectedApplication && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    role="dialog"
    aria-modal="true"
  >
    <motion.div
      className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Application Details</h2>
          <button
            onClick={() => setSelectedApplication(null)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Personal Information */}
          <Section title="Personal Information">
            <TwoColumnGrid>
              <Info label="Name" value={`${selectedApplication.personal_info.firstName} ${selectedApplication.personal_info.lastName}`} />
              <Info label="Email" value={selectedApplication.personal_info.email} />
              <Info label="Phone" value={selectedApplication.personal_info.phone} />
              <Info
                label="Address"
                value={`${selectedApplication.personal_info.address}, ${selectedApplication.personal_info.city}, ${selectedApplication.personal_info.state} ${selectedApplication.personal_info.zipCode}`}
              />
            </TwoColumnGrid>
          </Section>

          {/* Home Information */}
          <Section title="Home Information">
            <TwoColumnGrid>
              <Info label="Housing Type" value={selectedApplication.home_info.housing} />
              <Info label="Own/Rent" value={selectedApplication.home_info.ownRent} />
              <Info label="Has Yard" value={selectedApplication.home_info.hasYard ? 'Yes' : 'No'} />
              <Info label="Has Children" value={selectedApplication.home_info.hasChildren ? 'Yes' : 'No'} />
            </TwoColumnGrid>
          </Section>

          {/* Experience */}
          <Section title="Experience">
            <div className="space-y-4">
              <Info label="Previous Pet Experience" value={selectedApplication.experience.petExperience} />
              <Info label="Hours Pet Will Be Alone" value={`${selectedApplication.experience.hoursAlone} hours`} />
              <Info label="Exercise Plan" value={selectedApplication.experience.exercisePlan} />
            </div>
          </Section>

          {/* References */}
          <Section title="References">
            <TwoColumnGrid>
              <Info label="Reference Name" value={selectedApplication.reference_info.refName} />
              <Info label="Reference Phone" value={selectedApplication.reference_info.refPhone} />
              <Info label="Relationship" value={selectedApplication.reference_info.refRelationship} />
            </TwoColumnGrid>
          </Section>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={async () => {
              try {
                await updateApplicationStatus(selectedApplication.id, 'rejected');
                setSelectedApplication(null);
              } catch (error) {
                console.error('Failed to reject application:', error);
              }
            }}
            className="px-4 py-2 border border-error-600 text-error-600 rounded-lg hover:bg-error-50"
          >
            Reject
          </button>
          <button
            onClick={async () => {
              try {
                await updateApplicationStatus(selectedApplication.id, 'approved');
                setSelectedApplication(null);
              } catch (error) {
                console.error('Failed to approve application:', error);
              }
            }}
            className="px-4 py-2 bg-success-600 text-white rounded-lg hover:bg-success-700"
          >
            Approve
          </button>
        </div>
      </div>
    </motion.div>
  </div>
)}
