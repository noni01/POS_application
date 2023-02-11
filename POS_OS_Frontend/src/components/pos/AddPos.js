import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Row,
  Select,
  Typography,
  Dropdown,
} from "antd";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCustomer } from "../../redux/actions/customer/getCustomerAction";
import { addSale } from "../../redux/actions/sale/addSaleAction";
import Products from "./Products";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CalcBadge from "../calculator/CalcBadge";
import "./AddPos.css";
import CalcLogic from "../calculator/CalcLogic";

const { Title } = Typography;

// const items = [
//   {
//     key: '1',
//     label: (
//       <strong> Cash</strong>
//     ),
//   },
//   {
//     key: '2',
//     label: (
//       <strong> Online</strong>
//     ),
//   },

// ];

const AddPos = ({
  selectedProds,
  handleSelectedProdsQty,
  handleDeleteProd,
  handleSelectedProdsUnitPrice,
}) => {
  const { Option } = Select;
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const onClickLoading = () => {
    setLoader(true);
  };

  const [date, setDate] = useState(moment());
  const [afterDiscount, setAfterDiscount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllCustomer({ page: 1, limit: 10 }));
  }, [dispatch]);

  const allCustomer = useSelector((state) => state.customers.list);
  const allProducts = useSelector((state) => state.products.list);
  //get id from local storage
  const user_id = localStorage.getItem("id");

  const [customer, setCustomer] = useState(null);

  const [formData, setFormData] = useState({});
  const [gst, setGst] = useState('');

  function handleGst(gstamount) {
    

    
    const gstPercentage = gstamount / 100;
    console.log("gst percentage",gstPercentage)

    // Update the state with the converted value
    setGst(gstPercentage);
    
  }
  console.log("gst check: ", gst);

  const [totalDiscountPaidDue, setTotalDiscountPaidDue] = useState({
    total: 0,
    discount: 0,
    afterDiscount: 0,
    paid: 0,
    due: 0,
  });

  const handleDiscount = (discountAmount) => {
    const discountPercentage =
      (totalDiscountPaidDue.total * discountAmount) / 100;

    const afterDiscount = totalDiscountPaidDue.total - discountPercentage;
    let dueAmount = totalDiscountPaidDue.total - discountPercentage;
    if (totalDiscountPaidDue.paid > 0) {
      dueAmount = dueAmount - totalDiscountPaidDue.paid;
    }
    setTotalDiscountPaidDue((prev) => ({
      ...prev,
      discount: discountPercentage,
      due: dueAmount,
      afterDiscount,
    }));
  };

  const [returnAmount, setReturnAmount] = useState(0);

  const handelReturnAmount = (givenAmount) => {
    setReturnAmount(givenAmount ? givenAmount - totalDiscountPaidDue.due : 0);
  };

  // const handlePaid = (paidAmount) => {
  // 	const dueAmount = totalDiscountPaidDue.afterDiscount - paidAmount;
  // 	setTotalDiscountPaidDue((prev) => ({
  // 		...prev,
  // 		paid: paidAmount,
  // 		due: dueAmount,
  // 	}));
  // };

  // Form Function
  const [form] = Form.useForm();

  const onFormSubmit = async (values) => {
    const saleInvoiceProduct = selectedProds.map((prod) => {
      return {
        product_id: prod.id,
        product_quantity: prod.selectedQty,
        product_sale_price: prod.sale_price,
      };
    });

    try {
      const valueData = {
        date: new Date().toString(),
        paid_amount: totalDiscountPaidDue.due,
        discount: totalDiscountPaidDue.discount,
        customer_id: customer,
        user_id: user_id,
        gst: gst,
        // total_amount: totalDiscountPaidDue.total,
        saleInvoiceProduct: [...saleInvoiceProduct],
      };

      console.log("DATA", valueData);

      const resp = await dispatch(addSale(valueData));

      if (resp.message === "success") {
        form.resetFields();
        setFormData({});
        setAfterDiscount(0);
        setLoader(false);
        setReturnAmount(0);
        navigate(`/sale/${resp.createdInvoiceId}`);
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoader(false);
      toast.error("Error while sales");
    }
  };

  const handleCustomerData = (data) => {
    setCustomer(data);
  };

  const onSearch = (value) => {};

  useEffect(() => {
    if (selectedProds.length > 0) {
      let total = 0;
      let afterDiscount = 0;
      let due = 0;

      selectedProds.forEach((prod) => {
        total += prod.sale_price * prod.selectedQty;
      });

      if (totalDiscountPaidDue.discount > 0) {
        afterDiscount = total - totalDiscountPaidDue.discount;
      } else afterDiscount = total;

      if (totalDiscountPaidDue.paid > 0) {
        due = afterDiscount - totalDiscountPaidDue.paid;
      } else due = afterDiscount;

      setTotalDiscountPaidDue((prev) => ({
        ...prev,
        total,
        afterDiscount,
        due,
      }));
    }
  }, [selectedProds, totalDiscountPaidDue.paid, totalDiscountPaidDue.discount]);
 

  return (
    <div className="card-pos">
      <Card className="mt-4 ">
        
        <Form
          form={form}
          className="m-lg-1"
          name="dynamic_form_nest_item"
          // onFinish={onFinish}
          // onChange={onChange}
          initialValues={{ discount: 0, gst: 0 }}
          layout="vertical"
          size="large"
          autoComplete="off"
        >
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <div className="d-flex justify-content-between gap-3">
                <div className="w-50">
                  <Form.Item
                    label="Customer "
                    name="customer_id"
                    style={{ maxWidth: "250px" }}
                    rules={[
                      {
                        required: true,
                        message: "Please Select a Customer!",
                      },
                    ]}
                  >
                    <Select
                      loading={!allCustomer}
                      showSearch
                      placeholder="Select a customer "
                      optionFilterProp="children"
                      onChange={handleCustomerData}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.children
                          .toString()
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    >
                      {allCustomer &&
                        allCustomer.map((cust) => (
                          <Option key={cust.id} value={cust.id}>
                            {cust.phone} - {cust.name}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-50">
                  <Form.Item label="Date" required>
                    <DatePicker
                      className="date-picker"
                      onChange={(value) => setDate(value._d)}
                      defaultValue={moment()}
                      label="date"
                      name="date"
                      rules={[
                        {
                          required: true,
                          message: "Please input Date!",
                        },
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
            </Col>

            <Col
              span={24}
              style={{ border: "1px solid #ccc", padding: "10px 10px" }}
            >
              <div
                style={{
                  padding: "10px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <strong>Total: </strong>
                <strong>{totalDiscountPaidDue.total + gst} INR</strong>
              </div>
              <div
                style={{
                  padding: "10px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  justifyContent: "space-between",
                }}
              >
                <strong>GST: </strong>
                <Form.Item
                 name="gst"
                 rules={[
                   {
                     required: true,
                     message: "Please input GST!",
                   },
                 ]}
                >
                  <InputNumber type="number"  onChange={handleGst} />
                </Form.Item>
                
              </div>
              <div
                style={{
                  padding: "10px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <strong>Discount: </strong>
                <Form.Item
                  name="discount"
                  rules={[
                    {
                      required: true,
                      message: "Please input discount!",
                    },
                  ]}
                >
                  <InputNumber type="number" onChange={handleDiscount} />
                </Form.Item>
              </div>

              <div
                style={{
                  padding: "10px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <strong>Pay Amount: </strong>
                <strong>{totalDiscountPaidDue.afterDiscount + gst} INR</strong>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{
                  padding: "10px 20px",
                  alignItems: "center",
                }}
              >
                <strong>Given Amount: </strong>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input discount!",
                    },
                  ]}
                >
                  <InputNumber type="number" onChange={handelReturnAmount} />
                </Form.Item>
              </div>
              <div
                style={{
                  padding: "10px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <strong>Return Amount: </strong>
                <strong>{returnAmount} INR</strong>
              </div>
              {/* <div
                style={{
                  padding: "10px 20px",
                  display: "flex",
                  gap: "10px",
                  //justifyContent: "space-between",
                }}
              >
                <strong>Remarks: </strong>
                <textarea className="remarks-textarea" rows={4}>
                  {" "}
                </textarea>
              </div> */}

              <Col span={24}>
                <Form.Item
                  className="mt-1 mb-1"
                  style={{ paddingLeft: "12px", paddingRight: "12px" }}
                >
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    loading={loader}
                    onClick={() => {
                      onClickLoading();
                      onFormSubmit();
                    }}
                  >
                    Place Order
                  </Button>
                </Form.Item>
              </Col>
              {/* <strong>Paid Amount: </strong>
				<Form.Item
				  name="paid_amount"
				  rules={[
					{
					  required: true,
					  message: "Please input Paid amount!",
					},
				  ]}
				>
				  <InputNumber type="number" onChange={handlePaid} />
				</Form.Item>
			  </div>
			  <div
				style={{
				  padding: "10px 20px",
				  display: "flex",
				  justifyContent: "space-between",
				  border: "1px solid #ccc",
				}}
			  > 
							<strong>Due Amount: </strong>
							<strong>{totalDiscountPaidDue.due} INR</strong>*/}
              {/* </div> */}
            </Col>

            <Col
              span={24}
              className="mt-2"
              style={{
                paddingRight: "0 !important",
                paddingLeft: "0 !important",
              }}
            >
              <CalcLogic />
              <Products
                formData={formData}
                setData={setFormData}
                allProducts={allProducts}
                // updateFormData={updateFormData}
                selectedProds={selectedProds}
                handleSelectedProdsQty={handleSelectedProdsQty}
                handleSelectedProdsUnitPrice={handleSelectedProdsUnitPrice}
                handleDeleteProd={handleDeleteProd}
              />
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default AddPos;
