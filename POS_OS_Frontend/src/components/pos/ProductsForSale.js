import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Select,
  Spin,
  Popover,
  Radio,
  Space,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getTotalProduct from "../../api/getAllApis/getTotalProduct";
import { loadProduct } from "../../redux/actions/product/getAllProductAction";
import { loadPosProduct } from "../../redux/actions/product/getPosProductAction";
import { loadSingleProductSubCategory } from "../../redux/actions/productSubCategory/detailProductSubCategoryAction";
import { loadAllProductSubCategory } from "../../redux/actions/productSubCategory/getProductSubCategory";
import "./pos.css";
import "./productforsale.css";

export default function ProductsForSale({ handleSelectedProds }) {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.products.list);
  const subCategory = useSelector((state) => state.productSubCategories?.list);
  const [loading, setLoading] = useState(false);
  

  const [finalSubCat, setfinalSubCat] = useState([]);

  useEffect(() => {
    const subCategoryToGetAllProd = {
      id: 0,
      name: "all products",
    };
    if (subCategory !== null) {
      setfinalSubCat([subCategoryToGetAllProd, ...subCategory]);
    }
  }, [subCategory]);

  const subCategoryProd = useSelector(
    (state) => state.productSubCategories?.sub_category?.product
  );

  const [totalProd, setTotalProd] = useState(0);
  const [prodList, setProdList] = useState(null);

  useEffect(() => {
    dispatch(loadProduct({ status: "true", page: 1, limit: 10 }));
    dispatch(loadAllProductSubCategory({ page: 1, limit: 100 }));
  }, []);

  useEffect(() => {
    setProdList(list);
  }, [list]);

  //TODO :IMPLEMENT TOTAL PROD info
  useEffect(() => {
    getTotalProduct().then((res) => setTotalProd(res));
  }, [list]);




  const handleSubCatChange = (catId) => {
    if (catId === 0) {
      dispatch(loadAllProductSubCategory({ page: 1, limit: 100 }));
      setProdList(list);
    } else {
      dispatch(loadSingleProductSubCategory(catId));
      setProdList(null);
    }
  };
 

  const [status, setStatus] = useState("true");

  const onShowSizeChange = (current, pageSize) => {};

  const Products = ({ item, index,  }) => {
    
    let stockMessage;
    let isDisabled = false;
    if (item.quantity <= 0) {
      stockMessage = <p style={{ color: "red" }}>Out of stock!</p>;
      isDisabled = true;
    } else if (item.quantity < 5) {
      stockMessage = <p style={{ color: "orange" }}>Low stock!</p>;
    } else {
      stockMessage = <p style={{ color: "green" }}>In stock!</p>;
    }

    return (
      <Col span={24} sm={10} xl={5} key={index}>
        <Card
          hoverable
          style={{
            width: "100%",
            border: "none",
          }}
          className="pos-product-card"
          onClick={() => {
            handleSelectedProds(item);
          }}
          disabled={isDisabled}
        >
          <div className="d-flex align-items-center gap-2">
            {/* <div className="w-50" style={{ maxWidth: "5rem" }}>
              <img
                alt="example"
                src={item.thumbnail_image_url}
                style={{ width: "100%", height: "auto" }}
              />
            </div> */}
            <div className="w-50 flex-grow-1">
              <p className="font-weight-bold mb-0">{item.name}</p>
              <p className="mb-0" style={{ fontSize: "12px" }}>
                Price : {item.sale_price}
              </p>
              <p className="mb-0" style={{ fontSize: "12px" }}>
                QTY: {item.quantity}
              </p>
              
              {stockMessage}

              {/* <p style={{ fontSize: "12px" }}> SKU : {item.sku}</p> */}
            </div>
            <br />
          </div>
        </Card>
      </Col>
    );
  };
//filter
 

  // Single Product Search Function
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const resp = await dispatch(loadPosProduct(values.s_id));
    if (values.s_id === undefined) {
      setLoading(false);
      dispatch(loadProduct({ status: "true", page: 1, limit: 10 }));
    }
    if (resp.status === "success") {
      setProdList(resp.data);
      form.resetFields();
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    setLoading(false);
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div class="d-flex ">
        <div className="mt-2">
          <Form
            className="products-search-form"
            form={form}
            layout="inline"
            // labelCol={{
            //   span: 4,
            // }}
            // wrapperCol={{
            //   span: 16,
            // }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            // style={{width:"150px"}}
          >
            <Form.Item name="s_id">
              <Input placeholder="search product.." style={{width:"100px"}} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 16,
              }}
            >
              <Button
                loading={loading}
                onClick={() => setLoading(true)}
                className="ant-btn-new"
                type="primary"
                size="small"
                htmlType="submit"
              >
                Search
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="mt-2">
          <Select
            name="product_sub_category_id"
            loading={!subCategory}
            showSearch
            style={{
              width: 200,
            }}
            onChange={handleSubCatChange}
            placeholder="Select Subcategory"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            {finalSubCat &&
              finalSubCat.map((subcat) => (
                <Select.Option key={subcat.id} value={subcat.id}>
                  {subcat.name}
                </Select.Option>
              ))}
          </Select>
        </div>
        {/* //filter lowStock */}
        
      </div>


      <Row className="mt-2" gutter={[20, 20]} style={{ columnGap: "10px" }}>
        {prodList ? (
          prodList.map((item, index) => (
            <Products key={index} index={index} item={item} />
          ))
        ) : subCategoryProd ? (
          subCategoryProd.map((item, index) => (
            <Products key={index} index={index} item={item} />
          ))
        ) : (
          <div className="w-100 d-flex justify-content-center align-items-center">
            <Spin size="large" />
          </div>
        )}
      </Row>

      {totalProd > 0 && (
        <div className="mt-3">
          <Pagination
            className="pos-pagination"
            showSizeChanger
            onChange={(page, limit) => {
              dispatch(loadProduct({ page, limit, status }));
            }}
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={1}
            total={totalProd}
          />
        </div>
      )}
    </>
  );
}
