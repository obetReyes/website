import { ServiceI } from "@/interfaces/Data";
export function convertJsonToArray(jsonData:any) {
    const sections = jsonData.data.sections;
    const resultArray = [];
  
    for (const key in sections) {
      if (Array.isArray(sections[key])) {
        resultArray.push(sections[key]);
      } else if (key === "services" && Array.isArray(sections[key])) {
        const servicesArray = sections[key].map((service:ServiceI) => {
          return [service.service, service.description, service.image];
        });
        resultArray.push(servicesArray);
      } else {
        resultArray.push([sections[key]]);
      }
    }
  
    return resultArray;
  }
  