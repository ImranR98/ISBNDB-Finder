import { httpGet } from './helpers'

export interface ISBNDetails {
    title: string,
    title_long?: string,
    isbn: string,
    isbn13: string,
    dewey_decimal?: string,
    binding?: string,
    publisher?: string,
    language?: string,
    date_published?: Date,
    edition?: string,
    pages?: 0,
    dimensions?: string,
    overview?: string,
    image?: string,
    msrp?: 0,
    excerpt?: string,
    synopsys?: string,
    authors?: string[],
    subjects?: string[],
    reviews?: string[],
    prices?:
    {
        condition?: string,
        merchant?: string,
        merchant_logo?: string,
        merchant_logo_offset?: {
            x?: string,
            y?: string
        },
        shipping?: string,
        price?: string,
        total?: string,
        link?: string
    }[]
}

// Request ISBNDB for the details of a book
export async function getISBNDBBookDetails(APIKey: string, ISBN: string): Promise<ISBNDetails> {
    ISBN = ISBN.split('-').join('')
    const options = {
        hostname: 'api2.isbndb.com',
        path: '/book/' + ISBN,
        headers: {
            'Authorization': APIKey,
        }
    }
    let result = await httpGet(options)
    if (!result.book) throw result
    return result.book
}