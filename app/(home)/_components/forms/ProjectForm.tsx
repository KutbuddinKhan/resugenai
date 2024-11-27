import React, { useCallback, useEffect } from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateThumbnail } from "@/lib/helper";
import { toast } from "@/hooks/use-toast";
import useUpdateDocument from "@/features/document/use-update-documents";

const initialState = {
  id: undefined,
  docId: undefined,
  projectName: "",
  projectLink: "",
  description: "",
  technologies: "",
};

const ProjectForm = (props: { handleNext: () => void }) => {
  const { handleNext } = props;
  const { resumeInfo, onUpdate } = useResumeContext();

  const { mutateAsync, isPending } = useUpdateDocument();

  const [projectList, setProjectList] = React.useState(() => {
    return resumeInfo?.projects?.length ? resumeInfo.projects : [initialState];
  });

  useEffect(() => {
    if (!resumeInfo) return;
    onUpdate({
      ...resumeInfo,
      projects: projectList,
    });
  }, [projectList]);

  const handleChange = (
    e: { target: { name: string; value: string } },
    index: number
  ) => {
    const { name, value } = e.target;

    setProjectList((prevState) => {
      const newProjectList = [...prevState];
      newProjectList[index] = {
        ...newProjectList[index],
        [name]: value,
      };
      return newProjectList;
    });
  };

  const addNewProject = () => {
    setProjectList([...projectList, initialState]);
  };

  const removeProject = (index: number) => {
    const updatedProjects = [...projectList];
    updatedProjects.splice(index, 1);
    setProjectList(updatedProjects);
  };

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();

      const thumbnail = await generateThumbnail();
      const currentNo = resumeInfo?.currentPosition
        ? resumeInfo.currentPosition + 1
        : 1;

      await mutateAsync(
        {
          currentPosition: currentNo,
          thumbnail: thumbnail,
          projects: projectList,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Projects updated successfully",
            });
            handleNext();
          },
          onError() {
            toast({
              title: "Error",
              description: "Failed to update projects",
              variant: "destructive",
            });
          },
        }
      );
    },
    [resumeInfo, projectList]
  );

  return (
    <div>
      <div className="w-full">
        <h2 className="font-bold text-lg">Projects</h2>
        <p className="text-sm">Add your project details</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div
          className="border w-full h-auto
              divide-y-[1px] rounded-md px-3 pb-4 my-5
              "
        >
          {projectList?.map((item, index) => (
            <div key={index}>
              <div
                className="relative grid gride-cols-2
                  mb-5 pt-4 gap-3
                  "
              >
                {projectList?.length > 1 && (
                  <Button
                    variant="secondary"
                    type="button"
                    disabled={isPending}
                    className="size-[20px] text-center
                rounded-full absolute -top-3 -right-5
                !bg-black dark:!bg-gray-600 text-white
                "
                    size="icon"
                    onClick={() => removeProject(index)}
                  >
                    <X size="13px" />
                  </Button>
                )}

                <div className="col-span-2">
                  <Label className="text-sm">Project Name</Label>
                  <Input
                    name="projectName"
                    placeholder="Enter project name"
                    required
                    value={item?.projectName || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-sm">Project Link</Label>
                  <Input
                    name="projectLink"
                    placeholder="Enter project URL"
                    value={item?.projectLink || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-sm">Description</Label>
                  <Textarea
                    name="description"
                    placeholder="Provide a brief description of the project"
                    required
                    value={item.description || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-sm">Technologies</Label>
                  <Input
                    name="technologies"
                    placeholder="e.g., React, Node.js, TypeScript"
                    value={item?.technologies || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>

              {index === projectList.length - 1 &&
                projectList.length < 5 && (
                  <Button
                    className="gap-1 mt-1 text-primary 
                          border-primary/50"
                    variant="outline"
                    type="button"
                    disabled={isPending}
                    onClick={addNewProject}
                  >
                    <Plus size="15px" />
                    Add Another Projects
                  </Button>
                )}
            </div>
          ))}
        </div>
        <Button className="mt-4" type="submit" disabled={isPending}>
          {isPending && <Loader2 size="15px" className="animate-spin" />}
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default ProjectForm;
