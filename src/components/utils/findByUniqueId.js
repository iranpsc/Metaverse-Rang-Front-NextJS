
export function findByUniqueId(data, uniqueId) {
  if (data && data.modals) {
    for (const modal of data.modals) {
      for (const tab of modal.tabs) {
        const foundField = tab.fields.find(field => field.unique_id === uniqueId);
        if (foundField) {
          return foundField.translation
        }
      }
    }
  }
  return undefined;  // Return undefined if no match is found
}




