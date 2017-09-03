package dao;

import api.ReceiptResponse;
import generated.tables.records.ReceiptRecord;
import generated.tables.records.ReceiptTagRecord;
import generated.tables.records.TagRecord;
import org.jooq.Configuration;
import org.jooq.DSLContext;
import org.jooq.impl.DSL;

import java.math.BigDecimal;
import java.util.List;

import static com.google.common.base.Preconditions.checkState;
import static generated.Tables.*;

public class ReceiptDao {
    DSLContext dsl;

    public ReceiptDao(Configuration jooqConfig) {
        this.dsl = DSL.using(jooqConfig);
    }

    public int insert(String merchantName, BigDecimal amount) {
        ReceiptRecord receiptRecord = dsl
                .insertInto(RECEIPT, RECEIPT.MERCHANT, RECEIPT.AMOUNT) //receipt is the table
                .values(merchantName, amount)
                .returning(RECEIPT.ID)
                .fetchOne();

        checkState(receiptRecord != null && receiptRecord.getId() != null, "Insert failed");

        return receiptRecord.getId();
    }

    public List<ReceiptRecord> getAllReceipts() {
        return dsl.selectFrom(RECEIPT).fetch();
    }

    public List<ReceiptRecord> getTaggedReceipts(String tagQuery) {
        return dsl.selectFrom(RECEIPT)
                .where(TAG.tag.eq(tagQuery));
    }

}
