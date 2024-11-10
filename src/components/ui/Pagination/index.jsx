import { ConfigProvider, Pagination } from "antd";
import { Link, useSearchParams } from "react-router-dom";

import React from "react";
import useQuery from "@/hooks/useQuery";

const PaginationV1 = ({
  total,
  pageSizeOptions = [],
  showSizeChanger = false,
}) => {
  const [searchParams] = useSearchParams();
  const { controlPagination } = useQuery();
  const onPaginationChange = (page, limit) => {
    controlPagination({ page, limit });
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            borderRadius: "100%",
            colorPrimaryHover: null,
            colorBorderBg: "#845ADF",
            colorPrimary: "white",
            itemActiveBg: "#845ADF",
          },
        },
      }}
    >
      {!!total && (
        <Pagination
          current={+searchParams.get("page") || 1}
          pageSize={+searchParams.get("limit") || 10}
          total={total}
          className="!mt-4 justify-end"
          pageSizeOptions={pageSizeOptions}
          showSizeChanger={showSizeChanger}
          onChange={onPaginationChange}
        />
      )}
    </ConfigProvider>
  );
};

export default PaginationV1;
