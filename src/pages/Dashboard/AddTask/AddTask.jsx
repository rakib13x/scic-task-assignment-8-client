import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { CiCirclePlus } from "react-icons/ci";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";

const AddTask = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();

  const { user } = useAuth();
  console.log(user);
  const onSubmit = async (data) => {
    console.log(data);
    const taskStatus = "toDo";

    const addTask = {
      email: user?.email,
      title: data.title,
      description: data.description,
      taskStatus: taskStatus,
    };
    console.log(addTask);

    try {
      // Make the POST request to add the task
      const taskRes = await axiosPublic.post("/tasks", addTask);
      console.log(taskRes.data);

      // Check if the response contains the inserted ID
      if (taskRes.data.insertedId) {
        reset();
        Swal.fire({
          title: `You have added a Task`,
          icon: "success",
        });

        document.getElementById("my_modal_1").close();
      } else {
        // Handle the case where the response does not contain the inserted ID
        console.error("Error adding task: Inserted ID not found in response");
      }
    } catch (error) {
      // Handle errors that occur during the API request
      console.error("Error adding task:", error);
    }
  };
  return (
    <div>
      <button
        className="flex items-center justify-center gap-2 btn btn-outline"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        <div className="text-2xl">Add Task</div>
        <div>
          <CiCirclePlus className="text-2xl" />
        </div>
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="bg-gray-50 w-[800px] h-[800px] flex items-center justify-center rounded-lg">
          <div className="modal-action">
            <form method="" onSubmit={handleSubmit(onSubmit)}>
              {/* if there is a button in form, it will close the modal */}
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  defaultValue={user?.email}
                  readOnly
                  {...register("email", { required: true })}
                  className="input input-bordered w-full "
                />
              </div>
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="title"
                  {...register("title", { required: true })}
                  className="input input-bordered w-full "
                />
              </div>
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  placeholder="description"
                  {...register("description", { required: true })}
                  className="textarea textarea-bordered textarea-lg w-full max-w-xs"
                ></textarea>
              </div>
              <button
                className="btn ml-16"
                onClick={() => document.getElementById("my_modal_1").close()}
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddTask;
