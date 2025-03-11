import { useCallback, useEffect, useState } from 'react';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Seo } from 'src/components/seo';
import { useRouter } from 'next/router';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as AppLayout } from 'src/layouts';
import { FormTextField } from 'src/components/form/text-field';
import { getMappingResource } from '../../../api/mapping-resources';
import CodeMirrorDefault from "../../../components/form/codeMirrorDefault";

const useItem = (id) => {
  const [item, setItem] = useState(null);

  const handleItemGet = (id) => {
    getMappingResource(id)
      .then((res) => setItem(res))
      .catch((err) => console.error(err));
  };

  useEffect(
    () => {
      id && handleItemGet(id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );

  return item;
};

const ExtraForm = (props) => {
  const { item, formik, compare_items } = props;

  const [showCompare, setShowCompare] = useState(false);

  const handleCompareChange = (e) => {
    formik.setFieldValue('compare_item', e.target.value);
  };
  const handleTransformTestDataChange = useCallback(
    (event) => {
      formik.setFieldValue('transform_test_data', event.target.checked);
    },
    [formik]
  );

  return (
    <Stack gap={3}>
      <Grid
        xs={12}
        md={12}
      >
        <FormTextField
          formik={formik}
          name="identifier"
          label="Identifier"
          required
        />
      </Grid>
      <Divider />
      <Paper
        sx={{
          alignItems: 'flex-start',
          display: 'flex',
          px: 2,
        }}
        variant="outlined"
      >
        <FormControlLabel
          sx={{
            width: '100%',
          }}
          control={
            <Checkbox
              checked={formik.values.transform_test_data}
              onChange={handleTransformTestDataChange}
            />
          }
          label="Transform Test Data"
          value=""
        />
      </Paper>
      <Grid
        xs={12}
        md={12}
      >
        <CodeMirrorDefault
          label="RDF Manifestation"
          style={{ resize: 'vertical', overflow: 'auto', height: 600 }}
          value={formik.values.rdf_manifestation}
          onChange={(value) => formik.setValues('rdf_manifestation', value)}
          lang="TTL"
        />
      </Grid>
    </Stack>
  );
};

const useFileHistory = (sectionApi, id) => {
  const [compareItems, setCompareItems] = useState([]);

  useEffect(() => {
    id && handleItemHistoryGet(id);
  }, [id]);

  const handleItemHistoryGet = (id) => {
    sectionApi
      .getFileHistory(id)
      .then((res) => setCompareItems(res))
      .catch((err) => console.error(err));
  };

  return compareItems;
};

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  const item = useItem(id);
  // const compare_items = useFileHistory(sectionApi, fid).slice(1);
  // const item = formState.item;

  usePageView();

  if (!item) {
    return;
  }

  // const extra_form_fields = {
  //   identifier: item.identifier || '',
  //   rdf_manifestation: item.rdf_manifestation || '',
  //   transform_test_data: false,
  //   mapping_package_id: null,
  //   compare_items: compare_items,
  // };

  return (
    <>
      <Seo title={`Mapping Resources Edit`} />
      <Stack spacing={4}>
        <Stack spacing={4}>
          <Stack
            alignItems="flex-start"
            direction={{
              xs: 'column',
              md: 'row',
            }}
            justifyContent="space-between"
            spacing={4}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <Stack spacing={1}>
                <Typography variant="h4">{item.title}</Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Chip
                    label={item._id}
                    size="small"
                  />
                </Stack>
                <Stack gap={3}>
                  <Grid
                    xs={12}
                    md={12}
                  >
                    {/*<FormTextField*/}
                    {/*  formik={formik}*/}
                    {/*  name="identifier"*/}
                    {/*  label="Identifier"*/}
                    {/*  required*/}
                    {/*/>*/}
                  </Grid>
                  <Divider />
                  <Paper
                    sx={{
                      alignItems: 'flex-start',
                      display: 'flex',
                      px: 2,
                    }}
                    variant="outlined"
                  >
                    {/*<FormControlLabel*/}
                    {/*  sx={{*/}
                    {/*    width: '100%',*/}
                    {/*  }}*/}
                    {/*  control={*/}
                    {/*    <Checkbox*/}
                    {/*      checked={formik.values.transform_test_data}*/}
                    {/*      onChange={handleTransformTestDataChange}*/}
                    {/*    />*/}
                    {/*  }*/}
                    {/*  label="Transform Test Data"*/}
                    {/*  value=""*/}
                    {/*/>*/}
                  </Paper>
                  <Grid
                    xs={12}
                    md={12}
                  >
                    <CodeMirrorDefault
                      label="RDF Manifestation"
                      style={{ resize: 'vertical', overflow: 'auto', height: 600 }}
                      value={'formik.values.rdf_manifestation'}
                      // onChange={(value) => formik.setValues('rdf_manifestation', value)}
                      lang="TTL"
                    />
                  </Grid>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

Page.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Page;
