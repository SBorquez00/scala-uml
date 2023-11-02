import { useState } from "react";
import Button from "./Button";
import { Dialog, RadioGroup } from "@headlessui/react";
import { useFieldArray, useForm } from "react-hook-form";

interface FormCreateNodeProps {
  createFunction: any;
}

interface inputsProps {
  name: string;
}

interface UseFormInputs {
  name: string;
  tipo: string;
  inputs: inputsProps[];
}

const typeOptions = ["class", "abstractClass", "trait"];
const typeNames = ["Clase", "Clase abstracta", "Trait"];

export default function FormCreateNode(props: FormCreateNodeProps) {
  const [tipo, setTipo] = useState("class");
  const [isOpen, setIsOpen] = useState(false);
  const { control, register, handleSubmit, reset } = useForm<UseFormInputs>({
    defaultValues: { name: "", inputs: [{ name: "test" }] },
  });

  const { fields, append /* prepend, remove, swap, move, insert */ } =
    useFieldArray({
      control,
      name: "inputs",
    });
  const onSubmit = (data: UseFormInputs) => {
    console.log(tipo);
    submitHandler(
      data.name,
      data.inputs.map((input: any) => input.name),
      tipo
    );
  };

  const submitHandler = (name: string, methods: string[], type: string) => {
    props.createFunction(name, methods, type);
    reset();
    setIsOpen(false);
    setTipo("class");
  };

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Abrir modal
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
            <Dialog.Title
              as="h2"
              className="text-2xl text-center text-zinc-900 mb-3"
            >
              Crear nueva clase
            </Dialog.Title>
            <form onSubmit={handleSubmit(onSubmit)}>
              <RadioGroup value={tipo} onChange={setTipo}>
                <RadioGroup.Label className="font-semibold">
                  Tipo de Clase
                </RadioGroup.Label>
                {typeOptions.map((option, index) => (
                  <RadioGroup.Option key={option} value={option}>
                    {({ checked }) => (
                      <div
                        className={`${
                          checked ? "bg-blue-200" : "bg-gray-100"
                        } border rounded border-black mb-1 pl-1`}
                      >
                        {typeNames[index]}
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
              <label className="mr-3 font-semibold">Nombre de clase</label>
              <input
                {...register("name")}
                type="text"
                className="border rounded border-black mb-3 w-full"
              />
              <label className="mr-3 font-semibold">Metodos</label>
              <div className="w-full">
                {fields.map((field, index) => (
                  <input
                    type="text"
                    placeholder="Metodo"
                    key={field.id}
                    className="border rounded border-black mb-3 w-3/4"
                    {...register(`inputs.${index}.name` as const)}
                  ></input>
                ))}
                <Button
                  type="button"
                  onClick={() => {
                    fields.length < 12
                      ? append({ name: fields.length.toString() })
                      : console.log("maximo de inputs");
                  }}
                >
                  Add
                </Button>
              </div>

              <Button type="submit">Create new node </Button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
