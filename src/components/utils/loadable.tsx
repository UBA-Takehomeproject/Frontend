import type { ComponentType, LazyExoticComponent } from 'react';
import { Suspense } from 'react';

// project import
import Loader from '@/components/utils/loader';


const Loadable = (Component: LazyExoticComponent<ComponentType<any>>) => (props: any) =>
(
    <Suspense fallback={<Loader />}>
        <Component {...props} />
    </Suspense>
);

export default Loadable;
