import { useState } from 'react';

/**
 * Custom hook for handling forms with file uploads.
 * 
 * @param {Object} initialValues - Initial form values
 * @returns {Object} Form state and handlers
 */
const useFormWithFiles = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [files, setFiles] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  /**
   * Handle text input changes
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Handle file input changes
   * @param {Event} e - File input change event
   */
  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setFiles(prev => ({
        ...prev,
        [name]: file
      }));
      
      // Set file name in values for display
      setValues(prev => ({
        ...prev,
        [`${name}Name`]: file.name
      }));
      
      // Clear error when file is changed
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }
  };

  /**
   * Create FormData object with all form values and files
   * @returns {FormData} FormData object with all form data
   */
  const createFormData = () => {
    const formData = new FormData();
    
    // Add text values
    Object.keys(values).forEach(key => {
      if (values[key] !== undefined && !key.endsWith('Name')) {
        formData.append(key, values[key]);
      }
    });
    
    // Add files
    Object.keys(files).forEach(key => {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    });
    
    return formData;
  };

  /**
   * Reset form to initial values
   * @param {Object} newInitialValues - Optional new initial values
   */
  const resetForm = (newInitialValues = initialValues) => {
    setValues(newInitialValues);
    setFiles({});
    setErrors({});
    setIsSubmitting(false);
    setUploadProgress({});
  };

  /**
   * Get upload progress handler for a specific file
   * @param {string} fieldName - Name of the file field
   * @returns {Function} Progress handler function
   */
  const getProgressHandler = (fieldName) => {
    return (progress) => {
      setUploadProgress(prev => ({
        ...prev,
        [fieldName]: progress
      }));
    };
  };

  /**
   * Validate form values with provided validation schema
   * @param {Object} schema - Validation schema (e.g., Yup schema)
   * @returns {boolean} Whether form is valid
   */
  const validateForm = async (schema) => {
    try {
      await schema.validate(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const newErrors = {};
      
      validationErrors.inner.forEach(err => {
        newErrors[err.path] = err.message;
      });
      
      setErrors(newErrors);
      return false;
    }
  };

  return {
    values,
    files,
    errors,
    isSubmitting,
    uploadProgress,
    setValues,
    setFiles,
    setErrors,
    setIsSubmitting,
    handleChange,
    handleFileChange,
    createFormData,
    resetForm,
    getProgressHandler,
    validateForm
  };
};

export default useFormWithFiles; 