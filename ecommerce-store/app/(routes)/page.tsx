import getBillboard from '@/actions/get-billboard';
import Container from '@/components/ui/container';
import Billboard from '@/components/billboard';
import getProducts from '@/actions/get-products';
import ProductList from '@/components/product-list';

export const revalidate = 0;

const HomePage = async () => {
    const billboard = await getBillboard('43c66ee7-56f0-4bb9-b042-f77632d9f400');
    const products = await getProducts({ isFeatured: true });

    return (
        <Container>
            <div className='space-y-10 pb-10'>
                <Billboard data={billboard} />
                <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
                    <ProductList title="Featured Products" items={products} />
                </div>
            </div>
        </Container>
    )
}

export default HomePage