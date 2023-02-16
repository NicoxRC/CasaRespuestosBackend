import { useEffect } from 'react';
import { Formik, Field } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { patchProduct } from '../../services/patchProduct';
import { lines } from '../../utils/lines';
import { categories } from '../../utils/categories';
import Swal from 'sweetalert2';
import MySelect from '../../components/select/MySelect';
import Cookies from 'universal-cookie';

export default function EditProduct() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const location = useLocation();

  const { id, linea, categoria, descripcion, precio, referencia, cantidad } =
    location.state;

  const handleClickBack = () => {
    navigate('/');
  };

  const handleSubmit = async (values: any) => {
    if (values.referencia === referencia) {
      values.referencia = null;
    }

    const res = await patchProduct(id, values);
    if (res.message) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se puedo edtiar el producto, revisar referencia',
      });
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'El producto a sido editado',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/home');
    }
  };

  useEffect(() => {
    if (!cookies.get('user')) {
      navigate('/');
    }
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vw-100">
      <div className="mt-5">
        <button onClick={handleClickBack} className="btn btn-outline-dark">
          Volver
        </button>
      </div>
      <Formik
        initialValues={{
          linea: '',
          categoria: '',
          marca: '',
          descripcion: descripcion,
          precio: '',
          referencia: referencia,
          cantidad: '',
        }}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <form
            className="d-flex justify-content-center p-5 vw-100 h-100"
            onSubmit={handleSubmit}
          >
            <div className="container_form bg-dark wh-100">
              <label className="form-label mt-3">Linea:</label>
              <Field
                component="select"
                id="linea"
                name="linea"
                className="form-select mt-3"
              >
                <option hidden>{linea}</option>
                {lines.map((el: string) => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
              </Field>
              <label className="form-label mt-3">Categoria:</label>
              <Field
                component="select"
                id="categoria"
                name="categoria"
                className="form-select mt-3"
              >
                <option hidden>{categoria}</option>
                {categories.map((el: string) => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
              </Field>
              <label className="form-label mt-3">Marca:</label>
              <MySelect value={values.marca} onChange={setFieldValue} />
              <label className="form-label mt-3">Descripcion:</label>
              <Field
                type="text"
                name="descripcion"
                placeholder={descripcion}
                className="form-control mt-3"
              />
              <label className="form-label mt-3">Precio:</label>
              <Field
                type="number"
                name="precio"
                placeholder={precio}
                className="form-control mt-3"
              />
              <label className="form-label mt-3">Referencia:</label>
              <Field
                type="text"
                name="referencia"
                placeholder={referencia}
                className="form-control mt-3"
              />
              <label className="form-label mt-3">Cantidad:</label>
              <Field
                type="number"
                name="cantidad"
                placeholder={cantidad}
                className="form-control mt-3"
              />
              <button type="submit" className="btn btn-success mt-3 mb-3">
                Editar Producto
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
