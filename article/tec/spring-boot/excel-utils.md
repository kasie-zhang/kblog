---
title: Java 实现 Excel文件解析，Excel表格导出下载
date: 2021-04-25
cover: /img/cover/82.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- SpringBoot
- Java
- Util
publish: true
permalink: /82
---

> 第 82 篇文章
<!-- more -->

## ParseExcel
引入 `poi` 第三方库
需要构造一个实体类，来承接Excel表格中的单元格的数据。

```java 
package top.zk123.chain.util;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import top.zk123.chain.bean.ExcelData;
import top.zk123.chain.exception.ExcelNotFoundException;
import top.zk123.chain.exception.ExcelParseErrorException;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * Excel 解析类
 *
 * @author Ke Zhang
 * @since 2.0
 */
public class ExcelReader {
    private static final String XLS = "xls";
    private static final String XLSX = "xlsx";

    /**
     * 根据文件后缀名获取对应的工作薄对象
     *
     * @param inputStream 读取文件的输入流
     * @param fileType    文件后缀名
     * @return 包含文件数据的工作薄对象
     */
    public static Workbook getWorkbook(InputStream inputStream, String fileType) {
        Workbook workbook = null;
        try {
            if (fileType.equalsIgnoreCase(XLS)) {
                workbook = new HSSFWorkbook(inputStream);
            } else if (fileType.equalsIgnoreCase(XLSX)) {
                workbook = new XSSFWorkbook(inputStream);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return workbook;
    }

    /**
     * 将单元格内容转化为字符串
     *
     * @param cell 单元格
     * @return String
     */
    public static String convertCellValueToString(Cell cell) {
        if (cell == null) {
            return null;
        }
        String returnValue = null;
        switch (cell.getCellType()) {
            case STRING:    // 字符串
                returnValue = cell.getStringCellValue();
                break;
            case BLANK:     // 空值:
            case ERROR:     // 故障
                break;
            case BOOLEAN:   // 布尔值
                returnValue = String.valueOf(cell.getBooleanCellValue());
                break;
            case FORMULA:   // 公式:
                returnValue = cell.getCellFormula();
                break;
            case NUMERIC:
                DecimalFormat df = new DecimalFormat("0");
                returnValue = df.format(cell.getNumericCellValue());
                break;
            default:
                break;
        }
        return returnValue;
    }

    /**
     * 提取每一行的数据，构造成一个结果数据对象
     *
     * @param row 行数据
     * @return 结果数据对象
     * @throws ExcelParseErrorException Excel解析失败
     */
    public static ExcelData convertRowToData(Row row) throws ExcelParseErrorException {
        ExcelData resultData = new ExcelData();
        int cellNum = 0;
        String id = convertCellValueToString(row.getCell(cellNum++));
        if (id == null) {
            throw new ExcelParseErrorException("序号不得为空");
        }
        resultData.setId(id);
        String certType = convertCellValueToString(row.getCell(cellNum++));
        if (certType == null) {
            throw new ExcelParseErrorException("证书类型不得为空");
        }
        resultData.setCertType(certType);
        String name = convertCellValueToString(row.getCell(cellNum++));
        if (name == null) {
            throw new ExcelParseErrorException("姓名不得为空");
        }
        resultData.setName(name);
        String sex = convertCellValueToString(row.getCell(cellNum++));
        if (sex == null) {
            throw new ExcelParseErrorException("性别不得为空");
        }
        resultData.setSex(sex);
        String birth = convertCellValueToString(row.getCell(cellNum++));
        if (birth == null) {
            throw new ExcelParseErrorException("生日不得为空");
        }
        resultData.setBirth(birth);
        String userId = convertCellValueToString(row.getCell(cellNum++));
        if (userId == null) {
            throw new ExcelParseErrorException("身份证号不得为空");
        }
        resultData.setUserId(userId);
        String academy = convertCellValueToString(row.getCell(cellNum++));
        if (academy == null) {
            throw new ExcelParseErrorException("学院不得为空");
        }
        resultData.setAcademy(academy);
        String major = convertCellValueToString(row.getCell(cellNum++));
        if (major == null) {
            throw new ExcelParseErrorException("专业不得为空");
        }
        resultData.setMajor(major);
        String education = convertCellValueToString(row.getCell(cellNum++));
        if (education == null) {
            throw new ExcelParseErrorException("学历不得为空");
        }
        resultData.setEducation(education);
        String admission = convertCellValueToString(row.getCell(cellNum++));
        if (admission == null) {
            throw new ExcelParseErrorException("入学时间不得为空");
        }
        resultData.setAdmissionDate(admission);
        String graduate = convertCellValueToString(row.getCell(cellNum++));
        if (graduate == null) {
            throw new ExcelParseErrorException("毕业时间不得为空");
        }
        resultData.setGraduationDate(graduate);
        String certId = convertCellValueToString(row.getCell(cellNum++));
        if (certId == null) {
            throw new ExcelParseErrorException("证书编号不得为空");
        }
        resultData.setCertId(certId);
        String issueDate = convertCellValueToString(row.getCell(cellNum++));
        if (issueDate == null) {
            throw new ExcelParseErrorException("证书颁发日期不得为空");
        }
        resultData.setIssueDate(issueDate);
        String institution = convertCellValueToString(row.getCell(cellNum++));
        if (institution == null) {
            throw new ExcelParseErrorException("颁发单位不得为空");
        }
        resultData.setInstitution(institution);
        String userPic = convertCellValueToString(row.getCell(cellNum++));
        if (userPic == null) {
            throw new ExcelParseErrorException("一寸照名称不得为空");
        }
        resultData.setUserPic(userPic);
        String certPic = convertCellValueToString(row.getCell(cellNum));
        if (certPic == null) {
            throw new ExcelParseErrorException("证书扫描件名称不得为空");
        }
        resultData.setCertPic(certPic);
        return resultData;
    }

    /**
     * 解析 Excel 数据
     *
     * @param workbook Excel 工作薄
     * @return List {@link ExcelData}
     * @throws ExcelParseErrorException Excel解析失败
     */
    public static List<ExcelData> parseExcel(Workbook workbook) throws ExcelParseErrorException {
        List<ExcelData> resultDataList = new ArrayList<>();
        // 解析 sheet
        int tmp = workbook.getNumberOfSheets();
        for (int sheetNum = 0; sheetNum < workbook.getNumberOfSheets(); sheetNum++) {
            Sheet sheet = workbook.getSheetAt(sheetNum);
            if (sheet == null) {
                continue;
            }
            // 第一行数据所在行数
            int firstRowNum = sheet.getFirstRowNum();
            Row firstRow = sheet.getRow(firstRowNum);
            if (null == firstRow) {
                throw new ExcelParseErrorException();
            }
            // 解析后续每一行
            int rowStart = firstRowNum + 1;
            int rowEnd = sheet.getPhysicalNumberOfRows();
            for (int rowNum = rowStart; rowNum < rowEnd; rowNum++) {
                Row row = sheet.getRow(rowNum);
                if (null == row) {
                    continue;
                }
                ExcelData resultData = convertRowToData(row);
                resultDataList.add(resultData);
            }
        }
        return resultDataList;
    }

    /**
     * 解析 Excel 文件
     *
     * @param fileName 路径
     * @return List 实体类 {@link ExcelData}
     * @throws ExcelNotFoundException   文件不存在
     * @throws ExcelParseErrorException Excel解析失败
     */
    public static List<ExcelData> readExcel(String fileName) throws ExcelNotFoundException,
            ExcelParseErrorException {
        List<ExcelData> resultDataList = new ArrayList<>();
        Workbook workbook;
        FileInputStream is;

        try {
            String fileType = GlobalUtils.getExtension(fileName);
            File excelFile = new File(fileName);
            if (!excelFile.exists()) {
                throw new ExcelNotFoundException();
            }
            // 获取工作薄
            is = new FileInputStream(excelFile);
            workbook = getWorkbook(is, fileType);
            // 读取 Excel 数据
            resultDataList = parseExcel(workbook);
            workbook.close();
            is.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return resultDataList;
    }
}
```


## ExportExcel

### 导出工作簿
导出过程：
- 定义列头信息；
- 生成 sheet 表，写入第一行的列头； 
- 构建每一行的内容，返回工作簿。

```java 
package top.zk123.chain.util;

import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import top.zk123.chain.bean.Verify;

import java.util.ArrayList;
import java.util.List;

/**
 * Excel导出工具
 *
 * @author Ke Zhang
 * @since 2.5
 */
public class ExcelWriter {
    private static List<String> CELL_HEADS;   // 列头

    // 类装载时载入制定好的列头信息
    static {
        CELL_HEADS = new ArrayList<>();
        CELL_HEADS.add("证书文件名");
        CELL_HEADS.add("姓名");
        CELL_HEADS.add("性别");
        CELL_HEADS.add("证书类型");
        CELL_HEADS.add("身份证号");
        CELL_HEADS.add("证书编号");
        CELL_HEADS.add("验证结果");
    }

    /**
     * 生成Excel并写入数据信息
     *
     * @param dataList 数据列表
     * @return 写入数据后的工作薄对象
     */
    public static Workbook exportData(List<Verify> dataList) {
        // 生成 xlsx 的Excel
        Workbook workbook = new HSSFWorkbook();
        // 生成 sheet表,写入第一行的列头
        Sheet sheet = buildDataSheet(workbook);
        //构建每行的数据内容
        int rowNum = 1;
        for (Verify data : dataList) {
            if (data == null) {
                continue;
            }
            //输出行数据
            Row row = sheet.createRow(rowNum++);
            convertDataToRow(data, row);
        }
        return workbook;
    }

    /**
     * 将数据转换为行
     *
     * @param data 源数据
     * @param row  行对象
     */
    private static void convertDataToRow(Verify data, Row row) {
        int cellNum = 0;
        Cell cell;
        // 数字证书文件名
        cell = row.createCell(cellNum++);
        cell.setCellValue(null == data.getFileName() ? "" : data.getFileName());
        // 姓名
        cell = row.createCell(cellNum++);
        cell.setCellValue(null == data.getName() ? "" : data.getName());
        // 性别
        cell = row.createCell(cellNum++);
        cell.setCellValue(null == data.getSex() ? "" : data.getSex());
        // 证书类型
        cell = row.createCell(cellNum++);
        cell.setCellValue(null == data.getCertType() ? "" : data.getCertType());
        // 身份证号
        cell = row.createCell(cellNum++);
        cell.setCellValue(null == data.getUserId() ? "" : data.getUserId());
        // 证书编号
        cell = row.createCell(cellNum++);
        cell.setCellValue(null == data.getCertificateId() ? "" : data.getCertificateId());
        // 验证结果
        cell = row.createCell(cellNum);
        if (data.getVerifyResult().equals("true")) {
            cell.setCellValue("核验通过");
        } else if (data.getVerifyResult().equals("false")) {
            cell.setCellValue("核验未通过");
        }else {
            cell.setCellValue("");
        }
    }

    /**
     * 生成 sheet 表,并写入第一行数据(列头)
     *
     * @param workbook 工作簿对象
     * @return 已经写入列头的Sheet
     */
    public static Sheet buildDataSheet(Workbook workbook) {
        Sheet sheet = workbook.createSheet();
        // 设置列头宽度
        for (int i = 0; i < CELL_HEADS.size(); i++) {
            sheet.setColumnWidth(i, 4000);
        }
        // 设置默认行高
        sheet.setDefaultRowHeight((short) 400);
        // 构建头单元格样式
        CellStyle cellStyle = buildHeadCellStyle(sheet.getWorkbook());
        // 写入第一行各列的数据
        Row head = sheet.createRow(0);
        for (int i = 0; i < CELL_HEADS.size(); i++) {
            Cell cell = head.createCell(i);
            cell.setCellValue(CELL_HEADS.get(i));
            cell.setCellStyle(cellStyle);
        }
        // 单独设置 第1 列为文本格式
        CellStyle textCellStyle = workbook.createCellStyle();
        textCellStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("@"));
        sheet.setDefaultColumnStyle(0, textCellStyle);
        // 单独设置 第2 列为整数格式
        CellStyle intNumCellStyle = workbook.createCellStyle();
        intNumCellStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("0"));
        sheet.setDefaultColumnStyle(1, intNumCellStyle);
        // 单独设置 第3 列为两位小数格式
        CellStyle floatNumCellStyle = workbook.createCellStyle();
        floatNumCellStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("0.00"));
        sheet.setDefaultColumnStyle(2, floatNumCellStyle);
        return sheet;
    }

    /**
     * 设置第一行列头的样式
     *
     * @param workbook 工作簿对象
     * @return 单元格式对象
     */
    private static CellStyle buildHeadCellStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        // 水平居中
        style.setAlignment(HorizontalAlignment.CENTER);
        // 垂直居中
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        // 边框颜色和宽度设置
        style.setBorderBottom(BorderStyle.THIN);
        style.setBottomBorderColor(IndexedColors.BLACK.getIndex()); // 下边框
        style.setBorderLeft(BorderStyle.THIN);
        style.setLeftBorderColor(IndexedColors.BLACK.getIndex()); // 左边框
        style.setBorderRight(BorderStyle.THIN);
        style.setRightBorderColor(IndexedColors.BLACK.getIndex()); // 右边框
        style.setBorderTop(BorderStyle.THIN);
        style.setTopBorderColor(IndexedColors.BLACK.getIndex()); // 上边框
        // 设置背景颜色
        style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        // 字体设置
        Font font = workbook.createFont();
        font.setBold(true);
        font.setFontName("宋体");
        font.setFontHeightInPoints((short) 16);
        style.setFont(font);
        return style;
    }

}
```
### 返回数据给前端下载
> 将工作簿传输至前端，提供下载
```java 
public void exportExcel(HttpServletRequest request, HttpServletResponse response, List<Verify> dataList) {
    Workbook workbook = null;
    OutputStream out = null;
    try {
        // 生成Excel工作簿对象并写入数据
        workbook = ExcelWriter.exportData(dataList);

        // 写入Excel文件到前端
        String excelName = "示例Excel导出";
        String fileName = excelName + ".xls";
        fileName = new String(fileName.getBytes(StandardCharsets.UTF_8), "iso8859-1");
        response.setHeader("Content-Disposition", "attachment;filename=" + fileName);
        response.setContentType("application/x-xls");
        response.setCharacterEncoding("UTF-8");
        response.addHeader("Pargam", "no-cache");
        response.addHeader("Cache-Control", "no-cache");
        response.flushBuffer();
        out = response.getOutputStream();
        workbook.write(out);
        out.flush();
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        try {
            if (null != workbook) {
                workbook.close();
            }
            if (null != out) {
                out.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```