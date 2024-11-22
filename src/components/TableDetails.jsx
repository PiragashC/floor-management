import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RoomContext } from "../contex/RoomContex";

const TableDetails = () => {
  const { selectedTable, handleTableUpdate, currentRoom, setSelectedTable } =
    useContext(RoomContext);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: selectedTable || {},
  });

  useEffect(() => {
    if (selectedTable) {
      reset(selectedTable);
    }
  }, [selectedTable, reset]);

  useEffect(() => {
    if (
      selectedTable &&
      !currentRoom.tables.some((table) => table.id === selectedTable.id)
    ) {
      setSelectedTable(null);
    }
  }, [selectedTable, currentRoom, setSelectedTable]);

  if (!selectedTable)
    return <div className="sidebar_options_body">Select a table to edit</div>;

  const onSubmit = (data) => {
    handleTableUpdate(data);
  };

  // Helper functions for increment and decrement
  const incrementValue = (field, step = 1) => {
    const currentValue = watch(field) || 0;
    setValue(field, currentValue + step);
  };

  const decrementValue = (field, step = 1) => {
    const currentValue = watch(field) || 0;
    if (currentValue > 0) {
      setValue(field, currentValue - step);
    }
  };

  return (
    <div className="sidebar_options_body">
      <h6 className="heading">Table Details</h6>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="option_area">
          <div className="detail_form_grp">
            <p>Table name</p>
            <input
              type="text"
              className="add_input"
              {...register("name", { required: "Table name is required" })}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
          <div className="detail_form_grp">
            <p>Min Covers</p>
            <div className="qty_input_grp">
              <button
                type="button"
                className="qty_btn dec"
                onClick={() => decrementValue("minCovers")}
              >
                <i className="bi bi-dash"></i>
              </button>
              <input
                type="number"
                {...register("minCovers", {
                  required: "Minimum covers is required",
                  min: {
                    value: 1,
                    message: "Minimum covers must be at least 1",
                  },
                })}
                className="qty_input"
              />
              {errors.minCovers && (
                <p className="error">{errors.minCovers.message}</p>
              )}
              <button
                type="button"
                className="qty_btn inc"
                onClick={() => incrementValue("minCovers")}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          </div>
          <div className="detail_form_grp">
            <p>Max Covers</p>
            <div className="qty_input_grp">
              <button
                type="button"
                className="qty_btn dec"
                onClick={() => decrementValue("maxCovers")}
              >
                <i className="bi bi-dash"></i>
              </button>
              <input
                type="number"
                {...register("maxCovers", {
                  required: "Maximum covers is required",
                  validate: (value) =>
                    value >= (watch("minCovers") || 1) ||
                    "Maximum covers must be greater than or equal to Min Covers",
                })}
                className="qty_input"
              />
              {errors.maxCovers && (
                <p className="error">{errors.maxCovers.message}</p>
              )}
              <button
                type="button"
                className="qty_btn inc"
                onClick={() => incrementValue("maxCovers")}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          </div>
          <div className="detail_form_grp">
            <p>Online</p>

            {watch("online") && <small className="text_active">Active</small>}

            <label className="toggle-switch">
              <input
                type="checkbox"
                {...register("online")}
                checked={watch("online")}
                onChange={(e) => setValue("online", e.target.checked)}
              />
              <div className="toggle-switch-background">
                <div className="toggle-switch-handle"></div>
              </div>
            </label>
          </div>
        </div>
        <button type="submit" className="add_btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default TableDetails;
