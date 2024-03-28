const ExpndableBoxRow = ({ data, getAll }) => {
  console.log(data, "datadatadatadata");
  const row = data;

  return (
    <div className="w-full border px-[3%] py-6 rounded-lg ">
      <div className="custom_shadow flex py-2 px-4 rounded-lg">
        <div className="w-full flex-col justify-center items-center">
          {row?.subCategories?.length > 0 ? (
            <div className="break-all text-wrap">
              <h3 className="text-red-500 text-lg">Sub Categories</h3>
              <div className="break-all mt-4 text-wrap">
                {row?.subCategories?.map((item, index) => (
                  <p key={item.id} className="text-sm">
                    {index + 1}- {item?.name}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm"> no sub-categories</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpndableBoxRow;
