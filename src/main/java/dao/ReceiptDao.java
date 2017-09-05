package dao;

import generated.tables.records.ReceiptRecord;
import generated.tables.records.*;

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
		ReceiptRecord receiptRecord = dsl.insertInto(RECEIPT, RECEIPT.MERCHANT, RECEIPT.AMOUNT) //receipt is the table
				.values(merchantName, amount).returning(RECEIPT.ID).fetchOne();

		checkState(receiptRecord != null && receiptRecord.getId() != null, "Insert failed");

		return receiptRecord.getId();
	}

	public List<ReceiptRecord> getAllReceipts() {
		return dsl.selectFrom(RECEIPT).fetch();
	}

	public List<ReceiptTagRecord> getReceiptTags(String tagName, Integer receiptId) {
		return dsl.select()
				.from(RECEIPT_TAG
					.join(TAG).on(TAG.ID.eq(RECEIPT_TAG.TAGID))
					.join(RECEIPT).on(RECEIPT.ID.eq(RECEIPT_TAG.RECEIPTID)))
				.where(TAG.TAGNAME.eq(tagName))
				.and(RECEIPT.ID.eq(receiptId))
				.fetch().into(RECEIPT_TAG);
	}

	public boolean checkTagExists(String tagName) {
		return dsl.fetchExists(dsl.selectFrom(TAG).where(TAG.TAGNAME.eq(tagName)));
	}

	public void addTag(String tagName) {
		dsl.insertInto(TAG, TAG.TAGNAME).values(tagName).execute();
	}

	public void addTagToReceipt(Integer tagId, Integer receiptId) {
		dsl.insertInto(RECEIPT_TAG, RECEIPT_TAG.TAGID, RECEIPT_TAG.RECEIPTID).values(tagId, receiptId).execute();
	}

	public Integer getTagId(String tagName) {
		return dsl.select().from(TAG).where(TAG.TAGNAME.eq(tagName)).fetchOne().getValue(TAG.ID);
	}

	public void removeTagFromReceipt(Integer tagId, Integer receiptId) {
		dsl.delete(RECEIPT_TAG)
			.where(RECEIPT_TAG.TAGID.eq(tagId))
			.and(RECEIPT_TAG.RECEIPTID.eq(receiptId))
			.execute();
	}

	public List<ReceiptRecord> getTaggedReceipts(String tagQuery) {
		return dsl.select()
				.from(
						RECEIPT.join(RECEIPT_TAG.join(TAG).on(RECEIPT_TAG.TAGID.eq(TAG.ID))).on(RECEIPT.ID.eq(RECEIPT_TAG.RECEIPTID)))
				.where(TAG.TAGNAME.eq(tagQuery)).fetch().into(RECEIPT);
	}

}
