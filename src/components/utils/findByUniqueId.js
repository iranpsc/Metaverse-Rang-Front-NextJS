
export function findByUniqueId(data, uniqueId) {
  // console.log("IDDDDDD:data",data)
  // console.log("IDDDDDD:uniqueId",uniqueId)
  
  if (data && data.modals) {
    for (const modal of data.modals) {
      for (const tab of modal.tabs) {
        const foundField = tab.fields.find(field => Number(field.unique_id) === Number(uniqueId));
        if (foundField) {
          
          return foundField.translation
        }
      }
    }
  }
  return undefined;  // Return undefined if no match is found
}




