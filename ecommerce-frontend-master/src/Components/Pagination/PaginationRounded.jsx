import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded({ count, page, onChange }) {
    return (
        <Stack spacing={2}>
            <Pagination
                count={count}     // Tổng số trang
                page={page}       // Trang hiện tại
                onChange={onChange} // Hàm xử lý thay đổi trang
                variant="outlined"
                shape="rounded"
                sx={{
                    '& .MuiPaginationItem-root': {
                        fontSize: '1rem', // Change the font size
                        width: '2.5rem', // Change the width of each pagination item
                        height: '2.5rem', // Change the height of each pagination item
                    },
                    '& .MuiPaginationItem-ellipsis': {
                        fontSize: '0.5rem', // Change the font size for ellipsis
                    }
                }} // Inline styles using sx prop
            />
        </Stack>
    );
}
