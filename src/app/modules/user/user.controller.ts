import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const getUserDashboardData = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await UserServices.getUserDashboardDataFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User dashboard data fetched successfully',
    data: result,
  });
});

export const UserControllers = {
  getUserDashboardData,
};
