/**
 * Converts an object to FormData, handling files and nested objects
 * @param {Object} data - The data object to convert
 * @returns {FormData} - The resulting FormData object
 */
export const objectToFormData = (data) => {
  const formData = new FormData();
  
  // Recursively append data to FormData
  const appendToFormData = (obj, prefix = '') => {
    if (obj === null || obj === undefined) {
      return;
    }
    
    if (obj instanceof File) {
      // Handle File objects
      formData.append(prefix, obj);
    } else if (obj instanceof FileList) {
      // Handle FileList objects
      for (let i = 0; i < obj.length; i++) {
        formData.append(`${prefix}[${i}]`, obj[i]);
      }
    } else if (Array.isArray(obj)) {
      // Handle arrays
      if (obj.length === 0) {
        formData.append(prefix, '');
      } else {
        obj.forEach((item, index) => {
          const newPrefix = `${prefix}[${index}]`;
          if (typeof item === 'object' && item !== null) {
            appendToFormData(item, newPrefix);
          } else {
            formData.append(newPrefix, item || '');
          }
        });
      }
    } else if (typeof obj === 'object' && !(obj instanceof Date)) {
      // Handle objects (excluding Date)
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        const newPrefix = prefix ? `${prefix}[${key}]` : key;
        
        if (value !== null && value !== undefined) {
          if (typeof value === 'object' && !(value instanceof File) && !(value instanceof Date)) {
            appendToFormData(value, newPrefix);
          } else {
            formData.append(newPrefix, value);
          }
        }
      });
    } else {
      // Handle primitive values
      formData.append(prefix, obj);
    }
  };
  
  appendToFormData(data);
  return formData;
};

/**
 * Creates FormData from a form reference with support for files
 * @param {HTMLFormElement} formRef - Reference to a form element
 * @returns {FormData} - FormData created from the form
 */
export const createFormDataFromForm = (formRef) => {
  if (!formRef || !formRef.current) {
    throw new Error('Invalid form reference');
  }
  
  return new FormData(formRef.current);
};

/**
 * Extracts files from an input event and puts them in an object
 * @param {Event} event - File input change event
 * @returns {Object} - Object containing the files
 */
export const extractFilesFromEvent = (event) => {
  const { name, files } = event.target;
  
  if (!files || files.length === 0) {
    return {};
  }
  
  return { [name]: files.length === 1 ? files[0] : Array.from(files) };
};

/**
 * Creates a HTML5 progress handler that updates a state
 * @param {Function} setProgress - State setter function for progress
 * @returns {Function} - The progress handler function
 */
export const createProgressHandler = (setProgress) => {
  return (event) => {
    if (event.lengthComputable) {
      const percentComplete = Math.round((event.loaded / event.total) * 100);
      setProgress(percentComplete);
    }
  };
}; 