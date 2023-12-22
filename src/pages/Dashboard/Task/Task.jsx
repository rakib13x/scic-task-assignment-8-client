import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import AddTask from "../AddTask/AddTask";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useAuth from "../../../hooks/useAuth";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const Task = () => {
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  console.log(user);
  console.log(user?.displayName);
  const {
    data: tasks = [],
    refetch,
    status,
  } = useQuery({
    queryKey: ["tasks", user?.email], // Include user email in the query key
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosPublic.get(`/tasks?email=${user.email}`);
        return res.data;
      } else {
        return [];
      }
    },
  });

  const [droppableIds, setDroppableIds] = useState([]);

  useEffect(() => {
    if (status === "success") {
      const allStatusTypes = ["toDo", "ongoing", "completed"]; // Include all possible status types
      const uniqueDroppableIds = Array.from(
        new Set([...allStatusTypes, ...tasks.map((task) => task.taskStatus)])
      );
      setDroppableIds(uniqueDroppableIds);
    }
  }, [status, tasks, user?.email]);

  const taskStatusMap = {
    toDo: "toDo",
    ongoing: "ongoing",
    completed: "completed",
  };

  const onDragEnd = async (result) => {
    console.log("onDragEnd triggered:", result);
    console.log("Current tasks:", tasks);
    if (!result.destination) {
      return;
    }

    const updatedTasks = [...tasks];
    const [removed] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, removed);

    const statusKey = result.destination.droppableId;
    if (!taskStatusMap.hasOwnProperty(statusKey)) {
      console.error(`Invalid statusKey: ${statusKey}`);
      return;
    }

    const updatedTasksWithStatus = updatedTasks.map((task, index) => ({
      ...task,
      taskStatus: taskStatusMap[statusKey],
      order: index + 1,
    }));
    const taskId = result.draggableId;
    console.log(taskId);

    await axiosPublic.put(
      `/tasks/${taskId}`,
      { taskStatus: taskStatusMap[statusKey], email: user?.email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    refetch({
      data: updatedTasksWithStatus,
    });
  };

  const handleDelete = (id) => {
    console.log("item deleted", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
        axiosPublic.delete(`/tasks/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your task has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleUpdate = async (data, { taskId }) => {
    // Use 'data' directly, no need for destructuring
    try {
      const { title, description } = data;

      const updatedTask = {
        title,
        description,
      };

      const response = await axiosPublic.put(
        `/tasks/update/${taskId}`,
        updatedTask,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        refetch();
        Swal.fire({
          title: "Updated!",
          text: "Your task has been updated.",
          icon: "success",
        });
        document.getElementById(taskId).close(); // Close the modal
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to update the task. Please try again later.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error updating task:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while updating the task. Please try again later.",
        icon: "error",
      });
    }
  };
  return (
    <div>
      <h2 className="flex justify-center text-3xl font-semibold">
        Task Management
      </h2>

      <h2 className="flex justify-center pt-8">
        <AddTask />
      </h2>

      <h1 className="text-center text-3xl font-semibold py-4">
        {user?.displayName}'s Task
      </h1>
      <div className="overflow-x-auto">
        {tasks && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex">
              {droppableIds.map((statusKey) => (
                <div key={statusKey} className="flex-1 p-4">
                  <h2 className="text-xl font-semibold mb-4">{statusKey}</h2>
                  <Droppable droppableId={statusKey} key={statusKey}>
                    {(provided, snapshot) => (
                      <ul
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`${
                          snapshot.isDraggingOver ? "bg-gray-200" : "border"
                        } p-4 rounded border`}
                      >
                        {tasks
                          .filter((task) => task.taskStatus === statusKey)
                          .map((task, index) => (
                            <Draggable
                              key={task._id}
                              draggableId={task._id}
                              index={index}
                              className="border"
                            >
                              {(provided, snapshot) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`${
                                    snapshot.isDragging
                                      ? "bg-blue-200 border"
                                      : "border text-center mb-4 text-xl"
                                  } mb-4 p-2 rounded cursor-pointer border-black`}
                                >
                                  <div className="flex items-center justify-evenly">
                                    {task.title}
                                    <button
                                      onClick={() => handleDelete(task._id)}
                                    >
                                      <FaTrashAlt className="text-red-600" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        document
                                          .getElementById(`${task._id}`)
                                          .showModal()
                                      }
                                    >
                                      <FaEdit />
                                    </button>
                                    <dialog id={task._id} className="modal">
                                      <div className="bg-gray-50 w-[800px] h-[800px] flex items-center justify-center rounded-lg">
                                        <div className="modal-action">
                                          <form
                                            method=""
                                            onSubmit={handleSubmit((data) =>
                                              handleUpdate(data, {
                                                taskId: task._id,
                                              })
                                            )}
                                          >
                                            {/* if there is a button in form, it will close the modal */}
                                            <div className="form-control w-full my-6">
                                              <label className="label">
                                                <span className="label-text">
                                                  Email
                                                </span>
                                              </label>
                                              <input
                                                type="text"
                                                defaultValue={user?.email}
                                                readOnly
                                                {...register("email", {
                                                  required: true,
                                                })}
                                                className="input input-bordered w-full "
                                              />
                                            </div>
                                            <div className="form-control w-full my-6">
                                              <label className="label">
                                                <span className="label-text">
                                                  Title
                                                </span>
                                              </label>
                                              <input
                                                type="text"
                                                placeholder="title"
                                                {...register("title", {
                                                  required: true,
                                                })}
                                                className="input input-bordered w-full "
                                              />
                                            </div>
                                            <div className="form-control w-full my-6">
                                              <label className="label">
                                                <span className="label-text">
                                                  Description
                                                </span>
                                              </label>
                                              <textarea
                                                placeholder="description"
                                                {...register("description", {
                                                  required: true,
                                                })}
                                                className="textarea textarea-bordered textarea-lg w-full max-w-xs"
                                              ></textarea>
                                            </div>
                                            <button
                                              className="btn ml-16"
                                              onClick={handleUpdate}
                                            >
                                              Update Task
                                            </button>
                                            <button
                                              type="button"
                                              className="btn"
                                              onClick={() =>
                                                document
                                                  .getElementById(task._id)
                                                  .close()
                                              }
                                            >
                                              Close
                                            </button>
                                          </form>
                                        </div>
                                      </div>
                                    </dialog>
                                  </div>
                                </li>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

export default Task;
