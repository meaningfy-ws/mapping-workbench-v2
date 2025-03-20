import { ChangeEvent, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { FormikHelpers, useFormik } from 'formik';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { paths } from 'src/paths';
import { RouterLink } from 'src/components/router-link';
import { FormTextField } from 'src/components/form/text-field';
import { toastError, toastLoad, toastSuccess } from 'src/components/app-toast';
import CodeMirrorDefault from 'src/components/form/codeMirrorDefault';
import { Layout as AppLayout } from '../../../layouts';
import { getMappingResource, updateMappingResource } from '../../../api/vocabulary-mapping';
import { useRouter } from 'next/router';
import { MappingResources } from '../../../models/mapping-resources';
import { Seo } from '../../../components/seo';

export const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<MappingResources>({
    ['@id']: '',
    title: '',
    content: '',
    format: '',
  });

  useEffect(() => {
    id && getDate(id);
  }, [id]);

  const getDate = (id) => {
    getMappingResource(id)
      .then((res) => setData(res[0]))
      .catch((err) => console.error(err));
  };

  const initialValues = {
    '@id': data['@id'],
    title: data.title ?? '',
    content: data.content ?? '',
    filename: data.title ?? '',
    format: data.format ?? '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().max(255).required('Title is required'),
      description: Yup.string().max(2048),
      format: Yup.string().max(255).required('Format is required'),
    }),
    onSubmit: async (values, helpers: FormikHelpers<any>) => {
      const toastId = toastLoad('Updating...');

      updateMappingResource(values)
        .then((res) => {
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          router.push(paths.mappingResources.index);
          toastSuccess('Updated', toastId);
        })
        .catch((err) => {
          console.error(err);
          toastError(err, toastId);
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        });
    },
  });

  const getFileContent = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });

  const handleFile = (e: ChangeEvent) => {
    try {
      const target = e.target as HTMLInputElement;
      const res = getFileContent(target.files[0]);
      formik.setFieldValue('content', res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Seo title="App: Edit Resource Manager" />
      <form
        encType="multipart/form-data"
        onSubmit={formik.handleSubmit}
      >
        <Card>
          <CardHeader title={'Edit'} />
          <CardContent sx={{ pt: 0 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={12}
              >
                <FormTextField
                  formik={formik}
                  name="title"
                  label="Title"
                  required
                />
              </Grid>

              <Grid
                xs={12}
                md={12}
              >
                <TextField
                  error={!!(formik.touched.format && formik.errors.format)}
                  fullWidth
                  // helperText={formik.touched.format && formik.errors.format}
                  onBlur={formik.handleBlur}
                  label="Format"
                  onChange={(e) => {
                    formik.setFieldValue('format', e.target.value);
                  }}
                  select
                  required
                  value={formik.values.format}
                >
                  <MenuItem
                    key={'RFD'}
                    value={'RDF'}
                  >
                    RDF
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={12}
              >
                <CodeMirrorDefault
                  value={formik.values.content}
                  label="Content"
                  name="Content"
                  lang={formik.values.format}
                  style={{ resize: 'vertical', overflow: 'auto', height: 600 }}
                  onChange={(value: string) => formik.setFieldValue('content', value)}
                />
              </Grid>
              <Grid
                xs={12}
                md={12}
              >
                <Button
                  variant="contained"
                  component="label"
                >
                  Upload File
                  <input
                    type="file"
                    name="file"
                    onChange={handleFile}
                  />
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ mt: 3 }}>
          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            flexWrap="wrap"
            spacing={3}
            sx={{ p: 3 }}
          >
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              variant="contained"
            >
              {formik.isSubmitting && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: 'primary',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
              Update
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              disabled={formik.isSubmitting}
              href={'#'}
            >
              Cancel
            </Button>
          </Stack>
        </Card>
      </form>
    </>
  );
};

Page.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Page;
