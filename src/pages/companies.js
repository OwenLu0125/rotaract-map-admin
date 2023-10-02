import * as React from 'react';
import { useEffect, useState } from 'react';
import * as authProtocol from '../Backend/StoreProtocol';
import Head from 'next/head';
import {
  Box,
  Container,
  Pagination,
  Stack,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card';
import { CompaniesSearch } from 'src/sections/companies/companies-search';
import { CompaniesAdd } from 'src/sections/companies/companies-add';


const Page = () => {
  const [companiesData, setCompaniesData] = useState([]);
// FIXME: 串接的寫法
  useEffect(() => {
    const getCompaniesData = async () => {
      try {
        const data = await authProtocol.getStore()
        console.log(data)
        setCompaniesData(data)
      } catch (error) {
        console.error(error)
      }
    }
    getCompaniesData();
  }, []);

  return (
    <>
      <Head>
        <title>
          Companies | Devias Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  已註冊店家
                </Typography>
                {/* <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack> */}
              </Stack>
              <CompaniesAdd />
            </Stack>
            <CompaniesSearch />
            <Grid
              container
              spacing={3}
            >
              {companiesData.map((company) => (
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                  key={company.id}
                >
                  <CompanyCard company={company} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Pagination
                count={3}
                size="small"
              />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
