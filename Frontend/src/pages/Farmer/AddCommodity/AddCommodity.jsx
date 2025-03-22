import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AddCommodity = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Product name is required'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be positive'),
    quantity: Yup.number()
      .required('Quantity is required')
      .positive('Quantity must be positive')
      .integer('Quantity must be a whole number'),
    unit: Yup.string().required('Unit is required'),
    location: Yup.string().required('Location is required'),
  });

  // Setup formik
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      category: '',
      price: '',
      quantity: '',
      unit: 'kg',
      location: '',
      images: null
    },
    validationSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted with values:', values);
        setIsSubmitting(false);
        setSubmitSuccess(true);
        formik.resetForm();
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      }, 1000);
    },
  });

  return (
    <Container fluid className="my-4">
      <Row className="mb-4">
        <Col>
          <h2>{t('addNewCommodityTitle')}</h2>
          <p className="text-muted">{t('addNewCommodityDesc')}</p>
        </Col>
      </Row>

      {submitSuccess && (
        <Row className="mb-4">
          <Col>
            <Alert variant="success">
              {t('successSubmit')}
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('productName')}*</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.name && formik.errors.name}
                        placeholder="e.g. Organic Tomatoes"
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('category')}*</Form.Label>
                      <Form.Select
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.category && formik.errors.category}
                      >
                        <option value="">Select Category</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="fruits">Fruits</option>
                        <option value="grains">Grains</option>
                        <option value="dairy">Dairy</option>
                        <option value="livestock">Livestock</option>
                        <option value="other">Other</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.category}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>{t('description')}*</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.description && formik.errors.description}
                    placeholder="Describe your product in detail"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.description}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('pricePerUnit')}*</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.price && formik.errors.price}
                        placeholder="e.g. 25.00"
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.price}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('quantity')}*</Form.Label>
                      <Form.Control
                        type="number"
                        name="quantity"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.quantity && formik.errors.quantity}
                        placeholder="e.g. 100"
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.quantity}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('unit')}*</Form.Label>
                      <Form.Select
                        name="unit"
                        value={formik.values.unit}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.unit && formik.errors.unit}
                      >
                        <option value="kg">Kilogram (kg)</option>
                        <option value="g">Gram (g)</option>
                        <option value="lb">Pound (lb)</option>
                        <option value="ton">Ton</option>
                        <option value="piece">Piece</option>
                        <option value="dozen">Dozen</option>
                        <option value="liter">Liter</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.unit}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>{t('location')}*</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.location && formik.errors.location}
                    placeholder="e.g. Nashik, Maharashtra"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.location}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Enter the location where the product is grown/produced
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>{t('productImages')}</Form.Label>
                  <Form.Control
                    type="file"
                    name="images"
                    multiple
                    onChange={(event) => {
                      formik.setFieldValue('images', event.currentTarget.files);
                    }}
                  />
                  <Form.Text className="text-muted">
                    Upload up to 3 images of your product. Supported formats: JPG, PNG (Max: 5MB each)
                  </Form.Text>
                </Form.Group>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Button as={Link} to="/farmer/dashboard" variant="outline-secondary">
                    {t('cancel')}
                  </Button>
                  <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? t('submitting') : t('submitForApproval')}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCommodity; 